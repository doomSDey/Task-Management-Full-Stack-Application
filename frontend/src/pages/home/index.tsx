import { parseDate } from '@internationalized/date';
import {
    Button,
    Checkbox,
    CheckboxGroup,
    Divider,
    Pagination,
    Select,
    SelectItem,
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

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Ensure the page does not scroll back to the top
        const scrollPosition = window.scrollY;
        window.scrollTo(0, scrollPosition);
    };

    const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log('here', e.target.value)
        setItemsPerPage(parseInt(e.target.value, 10));
        setCurrentPage(1); // Reset to first page whenever items per page change
    };

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
                    status: selectedTab !== TaskTabs.All ? selectedTab : undefined,
                    orderBy: filterData.sortOption || 'createdAt',
                    order: filterData.sortOrder || 'asc',
                    page: currentPage,
                    limit: itemsPerPage,
                    search: debouncedSearchKeyword,
                } as FetchTasksParams);
                setTotalPages(fetchedTasks.totalPages)
                setTasks(fetchedTasks.tasks);
            } catch (error) {
                console.error('Error loading tasks:', error);
            }
        };
        loadTasks();
    }, [filterData, debouncedSearchKeyword, selectedTab, updateData, currentPage, itemsPerPage]);


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
            <div className="flex w-full flex-col md:pb-4 pt-4 px-4 pb-6">
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
                    <div className="flex w-full items-center space-x-2 overflow-hidden px-2 pb-3 pt-5">
                        <Button
                            variant='ghost'
                            color='danger'
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
                        </Button>
                    </div>
                )}
                {multiDeleteActive && (
                    <div className="flex items-center space-x-4 px-2 pb-3 pt-5">
                        <p className="whitespace-nowrap">
                            {selectedTaskCards.length} tasks selected
                        </p>
                        {selectedTaskCards.length !== 0 && (
                            <Button
                                color='danger'
                                variant='ghost'
                                onClick={() => {
                                    setModalType(ModalTypes.DeleteCards);
                                    onOpen();
                                }}
                            >
                                Delete Cards
                            </Button>
                        )}
                        <Button
                        variant='ghost'
                        color='primary'
                            onClick={() => {
                                setMultiDeleteActive(false);
                                setSelectedTaskCards([]);
                            }}
                        >
                            Cancel
                        </Button>
                    </div>
                )}
                <div className="h-full w-full flex flex-col justify-between overflow-y-auto px-1 py-4">
                    {
                        searchKeyword && tasks.length === 0 &&
                        <div className='w-full h-full flex flex-col gap-y-4 items-center justify-center'>
                            <Image src='/static/EmptySearch.svg' width={400} height={400} alt="No Search Results"></Image>
                            <p className='text-lg'>No task found!</p>
                        </div>
                    }
                    {
                        !searchKeyword && tasks.length === 0 &&
                        <div className='w-full h-full flex flex-col gap-y-4 items-center justify-center'>
                            <Image src='/static/EmptySection.svg' width={300} height={300} alt="Nothing here yet"></Image>
                            <p className='text-lg'>Create a task now</p>
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
                    {tasks.length !== 0 &&
                        <div className="flex justify-between items-center relative py-6">
                            <div className='md:block hidden'></div>
                            <Pagination radius='full' className='md:ml-32' showControls total={totalPages} initialPage={currentPage} onChange={handlePageChange} />
                            <Select
                                selectedKeys={[itemsPerPage.toString()]}
                                onChange={handleItemsPerPageChange}
                                radius='full'
                                className='max-w-24'
                                classNames={{ value: 'w-full' }}
                            >
                                <SelectItem value={10} key="10">10</SelectItem>
                                <SelectItem value={20} key="20">20</SelectItem>
                                <SelectItem value={50} key="50">50</SelectItem>
                            </Select>
                        </div>}
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
