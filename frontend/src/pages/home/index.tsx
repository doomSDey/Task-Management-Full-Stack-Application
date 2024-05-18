import { parseDate } from '@internationalized/date';
import {
    Button,
    Checkbox,
    CheckboxGroup,
    Divider,
    useDisclosure,
} from '@nextui-org/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import ModalComponent from '../../components/ModalComponent';
import Sidebar from '../../components/Sidebar';
import TaskCard from '../../components/TaskCard';
import TaskStatusTabs from '../../components/TaskStatusTabs';
import Topbar from '../../components/Topbar';
import {
    ModalTypes,
    TaskCardBackgroundColors,
    TaskTabs,
} from '../../helpers/enums';
import useDebounce from '../../hooks/useDebounce';
import {
    fetchTasks,
    FetchTasksParams,
    FetchTasksResponse,
    Task,
} from '../../service/tasks';

export interface DeleteCards {
    taskIds: string[];
    taskTitle?: string;
}
export interface FilterValues {
    startDate: string | null;
    endDate: string | null;
    sortOption: string | null;
    sortOrder: string | null;
}

function getRandomColor(): TaskCardBackgroundColors {
    const colors = Object.values(TaskCardBackgroundColors);
    return colors[Math.floor(Math.random() * colors.length)]!;
}

const App: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [selectedTab, setSelectedTab] = useState(TaskTabs.All);
    const [modalType, setModalType] = useState(ModalTypes.Filter);
    const [selectedTaskCards, setSelectedTaskCards] = useState<string[]>([]);
    const [currentTask, setCurrentTask] = useState<Task | undefined>();
    const [multiDeleteActive, setMultiDeleteActive] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState<string | undefined>(
        undefined
    );
    const debouncedSearchKeyword = useDebounce(searchKeyword, 300); // Debounce search input by 300ms
    const [filterData, setFilterData] = useState<FilterValues>({
        startDate: null,
        endDate: null,
        sortOption: null,
        sortOrder: null,
    });
    const isAnyFilterActive = Object.values(filterData).some(
        (value) => value !== null
    );
    const { isOpen, onOpenChange, onClose, onOpen } = useDisclosure();
    const [updateData, setUpdateData] = useState(-1);

    const onNotificationPress = (selectedTask: Task) => {
        setCurrentTask(selectedTask);
        setModalType(ModalTypes.ViewTask);
        onOpen();
    };

    useEffect(() => {
        const loadTasks = async () => {
            try {
                const fetchedTasks: FetchTasksResponse = await fetchTasks({
                    startDate: filterData.startDate,
                    endDate: filterData.endDate,
                    status:
                        selectedTab !== TaskTabs.All ? selectedTab : undefined,
                    orderBy: filterData.sortOption || 'createdAt',
                    order: filterData.sortOrder || 'asc',
                    page: 1,
                    limit: 10,
                    search: debouncedSearchKeyword,
                } as FetchTasksParams);
                setTasks(fetchedTasks.tasks);
            } catch (error) {
                console.error('Error loading tasks:', error);
            }
        };
        loadTasks();
    }, [filterData, debouncedSearchKeyword, selectedTab, updateData]);

    const initialDataAccordingToModal = () => {
        switch (modalType) {
            case ModalTypes.Filter:
                return filterData;
            case ModalTypes.CreateTask:
                return {
                    id: undefined,
                    title: undefined,
                    description: undefined,
                    status: undefined,
                    color: getRandomColor(),
                    dueDate: undefined,
                };
            case ModalTypes.EditTask:
            case ModalTypes.ViewTask: {
                const temp = { ...currentTask };
                if (currentTask?.dueDate && currentTask.dueDate && temp) {
                    const dueDateString = currentTask.dueDate
                        .toString()
                        .split('T')[0];
                    const dueDateObj = parseDate(dueDateString!);
                    temp['dueDate'] = dueDateObj;
                }
                return temp;
            }
            case ModalTypes.DeleteCard:
                return {
                    taskIds: [currentTask!.id.toString()],
                    taskTitle: currentTask?.title,
                };
            case ModalTypes.DeleteCards:
                return {
                    taskIds: selectedTaskCards,
                };
        }
    };

    return (
        <div className="flex h-[93%] w-full md:h-full">
            <Sidebar
                onOpen={onOpen}
                setModalType={setModalType}
                setMultiDeleteActive={setMultiDeleteActive}
            />
            <div className="flex w-full flex-col p-4">
                <Topbar
                    taskStatus={TaskTabs.All}
                    searchKeyword={searchKeyword}
                    setSearchKeyword={setSearchKeyword}
                    onNotificationPress={onNotificationPress}
                />
                <TaskStatusTabs
                    selectedKey={selectedTab}
                    setSelectedKey={setSelectedTab}
                />
                {isAnyFilterActive && (
                    <div className="flex w-full items-center space-x-2 overflow-hidden px-2 py-2">
                        <p
                            className="w-fit whitespace-nowrap text-danger hover:cursor-pointer hover:underline"
                            onClick={() =>
                                setFilterData({
                                    startDate: null,
                                    endDate: null,
                                    sortOption: null,
                                    sortOrder: null,
                                })
                            }
                        >
                            Clear Filter
                        </p>
                        <Divider className="my-4 w-full" />
                    </div>
                )}
                {multiDeleteActive && (
                    <div className="flex items-center space-x-4 overflow-hidden px-2 py-2">
                        <p className="whitespace-nowrap">
                            {selectedTaskCards.length} tasks selected
                        </p>
                        {selectedTaskCards.length !== 0 && (
                            <p
                                className="w-fit whitespace-nowrap text-danger hover:cursor-pointer hover:underline"
                                onClick={() => {
                                    setModalType(ModalTypes.DeleteCards);
                                    onOpen();
                                }}
                            >
                                Delete Cards
                            </p>
                        )}
                        <p
                            className="w-fit hover:cursor-pointer hover:underline"
                            onClick={() => {
                                setMultiDeleteActive(false);
                                setSelectedTaskCards([]);
                            }}
                        >
                            Cancel
                        </p>
                        <Divider className="my-4 w-full" />
                    </div>
                )}
                <div className="h-full w-full flex-col overflow-y-auto px-1 py-4">
                    {
                        searchKeyword && tasks.length === 0 &&
                        <div className='w-full h-full flex items-center justify-center'>
                            <Image src='/static/EmptySearch.svg' width={300} height={300} alt="No Search Results"></Image>
                        </div>
                    }
                    {
                        !searchKeyword && tasks.length === 0 &&
                        <div className='w-full h-full flex flex-col gap-y-4 items-center justify-center'>
                            <Image src='/static/EmptySection.svg' width={300} height={300} alt="Nothing here yet"></Image>
                            <p>Create a task now</p>
                            <Button
                                isIconOnly
                                aria-label="Add Task"
                                color='primary'
                                variant="ghost"
                                radius="full"
                                onPress={() => {
                                    setModalType(ModalTypes.CreateTask), onOpen();
                                }}
                            >
                                <i className="bi bi-plus-lg"></i>
                            </Button>
                        </div>
                    }
                    <CheckboxGroup
                        defaultValue={selectedTaskCards}
                        onValueChange={setSelectedTaskCards}
                        classNames={{ label: 'max-w-full' }}
                    >
                        <div className="columns-1 gap-4 sm:columns-2 md:columns-3 xl:columns-5">
                            {tasks.map((card) => (
                                <div
                                    className="mb-4 w-full break-inside-avoid"
                                    key={card.id}
                                    onClick={() => {
                                        setModalType(ModalTypes.ViewTask);
                                        setCurrentTask(card);
                                        onOpen();
                                    }}
                                >
                                    <TaskCard
                                        cardData={card}
                                        setUpdateData={setUpdateData}
                                        checkbox={
                                            <Checkbox
                                                className={`${!multiDeleteActive && 'hidden'}`}
                                                value={card.id.toString()}
                                                key={card.id}
                                            />
                                        }
                                        onEditButtonClick={() => {
                                            setModalType(ModalTypes.EditTask);
                                            setCurrentTask(card);
                                            onOpen();
                                        }}
                                        onDeleteButtonClick={() => {
                                            setModalType(ModalTypes.DeleteCard);
                                            setCurrentTask(card);
                                            onOpen();
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </CheckboxGroup>
                </div>
            </div>
            <ModalComponent
                type={modalType}
                initialValues={initialDataAccordingToModal()}
                onAccept={function (arg0?: FilterValues): void {
                    switch (modalType) {
                        case ModalTypes.Filter:
                            setFilterData(arg0 as FilterValues);
                            onClose();
                            break;
                        case ModalTypes.ViewTask:
                            setModalType(ModalTypes.EditTask);
                            break;
                        case ModalTypes.DeleteCard:
                        case ModalTypes.DeleteCards:
                            setMultiDeleteActive(false);
                            setSelectedTaskCards([]);
                            break;
                        default:
                            onClose();
                            return undefined;
                    }
                }}
                isOpen={isOpen}
                updateData={setUpdateData}
                onOpenChange={onOpenChange}
            />
        </div>
    );
};

export default App;
