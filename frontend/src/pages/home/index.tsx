import { CalendarDate, parseDate } from "@internationalized/date";
import { Checkbox, CheckboxGroup, Divider, useDisclosure } from "@nextui-org/react";
import { useEffect, useState } from "react";

import ModalComponent from "../../components/ModalComponent";
import Sidebar from "../../components/Sidebar";
import TaskCard from "../../components/TaskCard";
import TaskStatusTabs from "../../components/TaskStatusTabs";
import Topbar from "../../components/Topbar";
import { ModalTypes, TaskCardBackgroundColors, TaskTabs } from "../../helpers/enums";
import useDebounce from "../../hooks/useDebounce";
import { fetchTasks, FetchTasksParams, FetchTasksResponse, Task } from "../../service/tasks";

export interface FilterValues {
    startDate: string | null,
    endDate: string | null,
    sortOption: string | null,
    sortOrder: string | null
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
    const [searchKeyword, setSearchKeyword] = useState<string | undefined>(undefined);
    const debouncedSearchKeyword = useDebounce(searchKeyword, 300); // Debounce search input by 300ms
    const [filterData, setFilterData] = useState<FilterValues>({
        startDate: null,
        endDate: null,
        sortOption: null,
        sortOrder: null
    });
    const isAnyFilterActive = Object.values(filterData).some(value => value !== null);
    const { isOpen, onOpenChange, onClose, onOpen } = useDisclosure();

    useEffect(() => {
        const loadTasks = async () => {
            try {
                const fetchedTasks: FetchTasksResponse = await fetchTasks({
                    startDate: filterData.startDate,
                    endDate: filterData.endDate,
                    status: selectedTab !== TaskTabs.All ? selectedTab : undefined,
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
    }, [filterData, debouncedSearchKeyword, selectedTab]);

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
                const temp = {...currentTask};
                if (currentTask?.dueDate && currentTask.dueDate && temp) {
                    const dueDateString = currentTask.dueDate.toString().split('T')[0]
                    const dueDateObj = parseDate(dueDateString!)
                    temp['dueDate'] = dueDateObj
                }
                return temp;
            }
        }
    };

    return (
        <div className="flex h-[90%] md:h-full">
            <Sidebar onOpen={onOpen} setModalType={setModalType} setMultiDeleteActive={setMultiDeleteActive} />
            <div className="p-4 flex flex-col flex-grow">
                <Topbar taskStatus={TaskTabs.All} searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} />
                <TaskStatusTabs selectedKey={selectedTab} setSelectedKey={setSelectedTab} />
                {isAnyFilterActive &&
                    <div className="flex space-x-2 py-2 px-2 items-center w-full overflow-hidden">
                        <p className="hover:cursor-pointer hover:underline w-fit text-danger whitespace-nowrap" onClick={() => setFilterData({ startDate: null, endDate: null, sortOption: null, sortOrder: null })}>Clear Filter</p>
                        <Divider className="my-4 w-full" />
                    </div>
                }
                {multiDeleteActive && (
                    <div className="flex space-x-4 py-2 px-2 items-center overflow-hidden">
                        <p className="whitespace-nowrap">{selectedTaskCards.length} tasks selected</p>
                        <p className="hover:cursor-pointer hover:underline w-fit text-danger whitespace-nowrap" onClick={() => null}>Delete Cards</p>
                        <p className="hover:cursor-pointer hover:underline w-fit" onClick={() => { setMultiDeleteActive(false); setSelectedTaskCards([]); }}>Cancel</p>
                        <Divider className="my-4 w-full" />
                    </div>
                )}
                <div className="flex-col flex-grow overflow-y-auto py-4 px-1">
                    <CheckboxGroup
                        defaultValue={selectedTaskCards}
                        onValueChange={setSelectedTaskCards}
                        classNames={{ label: "max-w-full" }}
                    >
                        <div className="columns-2 md:columns-3 xl:columns-5 gap-4">
                            {tasks.map((card) => (
                                <div className="mb-4 break-inside-avoid w-full" key={card.id} onClick={() => { setModalType(ModalTypes.ViewTask); setCurrentTask(card); onOpen(); }}>
                                    <TaskCard
                                        cardData={card}
                                        statusChangeHandler={() => { }}
                                        checkbox={<Checkbox className={`${!multiDeleteActive && 'hidden'}`} value={card.id.toString()} key={card.id} />}
                                        onEditButtonClick={() => { setModalType(ModalTypes.EditTask); setCurrentTask(card); onOpen(); }}
                                    />
                                </div>
                            ))}
                        </div>
                    </CheckboxGroup>
                </div>
            </div>
            <ModalComponent type={modalType}
                initialValues={initialDataAccordingToModal()}
                onAccept={function (arg0: FilterValues | Partial<Task>): void {
                    switch (modalType) {
                        case ModalTypes.Filter:
                            setFilterData(arg0 as FilterValues);
                            onClose();
                            break;
                        case ModalTypes.ViewTask:
                            setModalType(ModalTypes.EditTask);
                            break;
                        //todo: EditTask and create task api call
                        default:
                            onClose();
                            return undefined;
                    }
                }}
                onDecline={function (): void {
                    throw new Error("Function not implemented.");
                }}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            />
        </div>
    );
};

export default App;
