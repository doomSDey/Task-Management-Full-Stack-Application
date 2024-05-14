import { CardHeader, Card as NextUICard } from '@nextui-org/react';

interface TaskCardProps {
    title: string;
    description: string;
    onClick: () => void;
    checkbox: React.ReactElement;
}

const TaskCard: React.FC<TaskCardProps> = ({ title, description, onClick, checkbox }) => {
    return (
        <NextUICard
            onClick={onClick}
            className="cursor-pointer p-4 hover:shadow-lg transition-shadow duration-300 max-h-96 min-h-32 flex flex-col"
        >
            <CardHeader className="pb-0 pt-2 px-4 flex-col gap-2 items-start">
                {checkbox}
                <h4 className="text-lg font-semibold mb-2">{title}</h4>
            </CardHeader>
            <div className="overflow-auto flex-grow">
                <p>{description}</p>
            </div>
        </NextUICard>
    );
};

export default TaskCard;