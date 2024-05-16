import { Button, Card as NextUICard, CardBody, CardFooter, CardHeader, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Select, SelectItem, Tooltip } from '@nextui-org/react';
import { Dispatch, SetStateAction, useState } from 'react';

import { useAuth } from '../context/AuthContext';
import { TaskCardBackgroundColors, TaskStatus } from '../helpers/enums';
import { Task, updateTask } from '../service/tasks';

interface TaskCardProps {
    cardData: Task;
    setUpdateData: Dispatch<SetStateAction<number>>;
    onEditButtonClick: () => void
    onDeleteButtonClick: () => void
    checkbox: React.ReactElement;
}

const TaskCard: React.FC<TaskCardProps> = ({ cardData, checkbox, setUpdateData, onEditButtonClick, onDeleteButtonClick }) => {
    const { title, description, status: initialStatus, color: initialColor } = cardData;
    const [status, setStatus] = useState(initialStatus);
    const [color, setColor] = useState(initialColor);
    const auth = useAuth();

    const handleStatusChange = async (newStatus: TaskStatus) => {
        console.log(newStatus,'newStatus')
        try {
            await updateTask({
                taskId: cardData.id,
                title: cardData.title,
                description: cardData.description,
                status: newStatus,
                dueDate: cardData.dueDate?.toString(),
                color,
            });
            setStatus(newStatus);
            setUpdateData((prev) => prev + 1);
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    };

    const handleColorChange = async (newColor: TaskCardBackgroundColors) => {
        try {
            await updateTask({
                taskId: cardData.id,
                title: cardData.title,
                description: cardData.description,
                status,
                dueDate: cardData.dueDate?.toString(),
                color: newColor,
            });
            setColor(newColor);
            setUpdateData((prev) => prev + 1);
        } catch (error) {
            console.error('Error updating task color:', error);
        }
    };

    return (
        <NextUICard
            className="cursor-pointer p-4 hover:shadow-lg transition-shadow duration-300 max-h-96 min-h-32 flex flex-col"
            style={{ background: color }}
        >
            <CardHeader className="pb-0 pt-2 px-4 flex-col gap-2 items-start">
                <div className='w-full flex justify-between'>
                    <div>
                        {checkbox}
                    </div>
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Button size='sm' variant='bordered' isIconOnly radius="full" aria-label="Colors" style={{ backgroundColor: color }}>
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Available Colors" variant="flat">
                            <DropdownItem className="cursor-default" isReadOnly>
                                <div className="flex gap-4">
                                    {Object.values(TaskCardBackgroundColors).map((colorOption) => (
                                        <Button key={colorOption} size='sm' isIconOnly radius="full" aria-label={colorOption} style={{ backgroundColor: colorOption }} onPress={() => handleColorChange(colorOption)}>
                                        </Button>
                                    ))}
                                </div>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
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
                        onChange={(e) => {handleStatusChange(e.target.value as TaskStatus)}}
                        size='sm'
                    >
                        {Object.values(TaskStatus).map((item) => (
                            <SelectItem key={item} value={item}>
                                {item}
                            </SelectItem>
                        ))}
                    </Select>
                    <Tooltip content="Edit">
                        <Button size='sm' isIconOnly aria-label="Edit Task" onPress={onEditButtonClick}><i className="bi bi-pencil"></i></Button>
                    </Tooltip>
                    <Tooltip content="Delete">
                        <Button size='sm' isIconOnly color="warning" aria-label="Delete Tasks" onPress={onDeleteButtonClick}>
                            <i className="bi bi-trash"></i>
                        </Button>
                    </Tooltip>
                </div>
            </CardFooter>
        </NextUICard >
    );
};

export default TaskCard;
