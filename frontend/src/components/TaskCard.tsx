import { Button, Card as NextUICard, CardBody, CardFooter, CardHeader, Select, SelectItem, Tooltip } from '@nextui-org/react';

import { TaskStatus } from '../helpers/enums';

interface TaskCardProps {
    title: string;
    description: string;
    status: TaskStatus;
    onClick: () => void;
    statusChangeHandler: (status: TaskStatus) => void
    checkbox: React.ReactElement;
}

const TaskCard: React.FC<TaskCardProps> = ({ title, description, onClick, checkbox, status, statusChangeHandler }) => {
    return (
        <NextUICard
            onClick={onClick}
            className="cursor-pointer p-4 hover:shadow-lg transition-shadow duration-300 max-h-96 min-h-32 flex flex-col"
        >
            <CardHeader className="pb-0 pt-2 px-4 flex-col gap-2 items-start">
                {checkbox}
                <h4 className="text-lg font-semibold mb-2">{title}</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <div className="overflow-auto flex-grow">
                    <p>{description}</p>
                </div>
            </CardBody>
            <CardFooter className="justify-between ">
                <div className="flex items-center space-x-2 w-full">
                    <Select
                        placeholder="Select current status"
                        selectedKeys={[status]}
                        onSelectionChange={(e) => statusChangeHandler(e as TaskStatus)}
                        size='sm'
                    >
                        {Object.values(TaskStatus).map((item) => (
                            <SelectItem key={item} value={item}>
                                {item}
                            </SelectItem>
                        ))}
                    </Select>
                    <Tooltip content="Edit">
                        <Button size='sm' isIconOnly aria-label="Edit Task"><i className="bi bi-pencil"></i></Button>
                    </Tooltip>
                    <Tooltip content="Delete">
                        <Button size='sm' isIconOnly color="warning" aria-label="Delete Tasks">
                            <i className="bi bi-trash"></i>
                        </Button>
                    </Tooltip>

                </div>

            </CardFooter>
        </NextUICard >
    );
};

export default TaskCard;