import { Checkbox, CheckboxGroup, Divider, useDisclosure } from "@nextui-org/react";
import { useState } from "react";

import ModalComponenet from "../../components/ModalComponent";
import Sidebar from "../../components/Sidebar";
import TaskCard from "../../components/TaskCard";
import TaskStatusTabs from "../../components/TaskStatusTabs";
import Topbar from "../../components/Topbar";
import { ModalTypes, TaskStatus, TaskTabs } from "../../helpers/enums";

export interface CardData {
    id: number;
    title: string;
    description: string;
    onClick: () => void;
    status: string;
    color?: string;
    dueData?: string;
}
export interface FilterValues {
    startDate: string | null,
    endDate: string | null,
    sortOption: string | null,
    sortOrder: string | null
}

const cardData: CardData[] = [
    { id: 1, title: 'Card 1', description: 'This is a short description.', onClick: () => alert('Card 1 clicked'), status: 'Done', color: '#FF5733' },
    { id: 2, title: 'Card 2', description: 'This is a slightly longer description that will increase the card height.', onClick: () => alert('Card 2 clicked'), status: 'Done', color: '#FF5733' },
    { id: 3, title: 'Card 3', description: 'This description is very long. It will make the card significantly taller than the other cards in the grid, demonstrating the masonry layout effect.', onClick: () => alert('Card 3 clicked'), status: 'Done', color: '#FF5733' },
    { id: 4, title: 'Card 4', description: 'Description 4.', onClick: () => alert('Card 4 clicked'), status: 'Done', color: '#FF5733' },
    // Add more cards as needed
    // Add more cards as needed
];

const App: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState(TaskTabs.All);
    const [modalType, setModalType] = useState(ModalTypes.Filter);
    const [selectedTaskCards, setSelectedTaskCards] = useState<string[]>([]);
    const [currentTask, setCurrentTask] = useState<CardData>();
    const [multiDeleteActive, setMultiDeleteActive] = useState(false);
    const [filterData, setFilterData] = useState<FilterValues>({
        startDate: null,
        endDate: null,
        sortOption: null,
        sortOrder: null
    });
    const isAnyFilterActive = Object.values(filterData).some(value => value !== null);
    const { isOpen, onOpenChange, onClose, onOpen } = useDisclosure();

    const initialDataAccordingToModal = () => {
        switch (modalType) {
            case ModalTypes.Filter:
                return filterData
            case ModalTypes.EditTask:
                return currentTask
        }
    }
    
    return (
        <div className="flex h-[90%] md:h-full">
            <Sidebar onOpen={onOpen} setModalType={setModalType} setMultiDeleteActive={setMultiDeleteActive} />
            <div className="p-4 flex flex-col flex-grow">
                <Topbar taskStatus={TaskTabs.All} />
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
                            {cardData.map((card) => (
                                <div className="mb-4 break-inside-avoid w-full" key={card.id}>
                                    <TaskCard
                                        cardData={card}
                                        onClick={card.onClick}
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
            <ModalComponenet type={modalType}
                initialValues={initialDataAccordingToModal()}
                onAccept={function (arg0: FilterValues | CardData): void {
                    setFilterData(arg0 as FilterValues)
                    onClose()
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
