import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import TaskCard from "../../components/TaskCard";
import TaskStatusTabs from "../../components/TaskStatusTabs";
import Topbar from "../../components/Topbar";
import { TaskStatus } from "../../helpers/enums";

interface CardData {
    id: number;
    title: string;
    description: string;
    onClick: () => void;
}

const cardData: CardData[] = [
    { id: 1, title: 'Card 1', description: 'This is a short description.', onClick: () => alert('Card 1 clicked') },
    { id: 2, title: 'Card 2', description: 'This is a slightly longer description that will increase the card height.', onClick: () => alert('Card 2 clicked') },
    { id: 3, title: 'Card 3', description: 'This description is very long. It will make the card significantly taller than the other cards in the grid, demonstrating the masonry layout effect.', onClick: () => alert('Card 3 clicked') },
    { id: 4, title: 'Card 4', description: 'Description 4.', onClick: () => alert('Card 4 clicked') },
    { id: 1, title: 'Card 1', description: 'This is a short description.', onClick: () => alert('Card 1 clicked') },
    { id: 2, title: 'Card 2', description: 'This is a slightly longer description that will increase the card height.', onClick: () => alert('Card 2 clicked') },
    { id: 3, title: 'Card 3', description: 'This description is very long. It will make the card significantly taller than the other cards in the grid, demonstrating the masonry layout effect.', onClick: () => alert('Card 3 clicked') },
    { id: 4, title: 'Card 4', description: 'Description 4.', onClick: () => alert('Card 4 clicked') },
    { id: 1, title: 'Card 1', description: 'This is a short description.', onClick: () => alert('Card 1 clicked') },
    { id: 2, title: 'Card 2', description: 'This is a slightly longer description that will increase the card height.', onClick: () => alert('Card 2 clicked') },
    { id: 3, title: 'Card 3', description: 'This description is very long. It will make the card significantly taller than the other cards in the grid, demonstrating the masonry layout effect.This description is very long. It will make the card significantly taller than the other cards in the grid, demonstrating the masonry layout effect.This description is very long. It will make the card significantly taller than the other cards in the grid, demonstrating the masonry layout effect.', onClick: () => alert('Card 3 clicked') },
    { id: 4, title: 'Card 4', description: 'Description 4.', onClick: () => alert('Card 4 clicked') },
    // Add more cards as needed
    // Add more cards as needed
];

const App: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState(TaskStatus.All);

    return (
        <div className="flex h-[90%] md:h-full">
            <Sidebar />
            <div className="p-4 flex flex-col flex-grow">
                <Topbar taskStatus={TaskStatus.All} />
                <TaskStatusTabs selectedKey={selectedTab} setSelectedKey={setSelectedTab}/>
                <div className="flex-col flex-grow overflow-y-auto py-4 px-1">
                    <div className="columns-2 md:columns-3 xl:columns-5 gap-4">
                        {cardData.map((card) => (
                            <div key={card.id} className="mb-4 break-inside-avoid">
                                <TaskCard
                                    title={card.title}
                                    description={card.description}
                                    onClick={card.onClick}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
