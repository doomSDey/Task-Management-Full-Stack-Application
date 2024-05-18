import {
    Button,
    Card as NextUICard,
    CardBody,
    CardFooter,
    CardHeader,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Select,
    SelectItem,
    Tooltip,
} from '@nextui-org/react';
import { Dispatch, SetStateAction, useState } from 'react';

import { useAuth } from '../context/AuthContext';
import { TaskCardBackgroundColors, TaskStatus } from '../helpers/enums';
import { Task, updateTask } from '../service/tasks';

interface TaskCardProps {
    cardData: Task;
    setUpdateData: Dispatch<SetStateAction<number>>;
    onEditButtonClick: () => void;
    onDeleteButtonClick: () => void;
    checkbox: React.ReactElement;
}

const TaskCard: React.FC<TaskCardProps> = ({
    cardData,
    checkbox,
    setUpdateData,
    onEditButtonClick,
    onDeleteButtonClick,
}) => {
    const {
        title,
        description,
        status: initialStatus,
        color: initialColor,
    } = cardData;
    const [status, setStatus] = useState(initialStatus);
    const [color, setColor] = useState(initialColor);
    const auth = useAuth();

    const handleStatusChange = async (newStatus: TaskStatus) => {
        console.log(newStatus, 'newStatus');
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
            className="flex max-h-96 min-h-32 cursor-pointer flex-col p-4 transition-shadow duration-300 hover:shadow-lg"
            style={{ background: color }}
        >
            <CardHeader className="flex-col items-start gap-2 px-4 pb-0 pt-2">
                <div className="flex w-full justify-between">
                    <div>{checkbox}</div>
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Button
                                size="sm"
                                variant="ghost"
                                isIconOnly
                                radius="full"
                                color='primary'
                                aria-label="Colors"
                                className='border-white'
                            >
                                <i className="bi bi-eyedropper text-white"></i>
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Available Colors"
                            variant="flat"
                        >
                            <DropdownItem className="cursor-default" isReadOnly>
                                <div className="flex gap-4">
                                    {Object.values(
                                        TaskCardBackgroundColors
                                    ).map((colorOption) => (
                                        <Button
                                            key={colorOption}
                                            size="sm"
                                            isIconOnly
                                            radius="full"
                                            aria-label={colorOption}
                                            style={{
                                                backgroundColor: colorOption,
                                            }}
                                            onPress={() =>
                                                handleColorChange(colorOption)
                                            }
                                        ></Button>
                                    ))}
                                </div>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <h4 className="mb-2 text-xl font-semibold text-ellipsis text-background">{title}</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2 px-4">
                <div className="flex-grow overflow-auto text-background">
                    <p>{description}</p>
                </div>
            </CardBody>
            <CardFooter className="justify-between ">
                <div className="flex w-full items-center space-x-2">
                    <Select
                        placeholder="Select current status"
                        selectedKeys={[status]}
                        onChange={(e) => {
                            handleStatusChange(e.target.value as TaskStatus);
                        }}
                        size="sm"
                        radius="full"
                    >
                        {Object.values(TaskStatus).map((item) => (
                            <SelectItem key={item} value={item}>
                                {item}
                            </SelectItem>
                        ))}
                    </Select>
                    <Tooltip content="Edit">
                        <Button
                            size="sm"
                            radius="full"
                            isIconOnly
                            aria-label="Edit Task"
                            variant='ghost'
                            color='primary'
                            className='text-white border-white'
                            onPress={onEditButtonClick}
                        >
                            <i className="bi bi-pencil"></i>
                        </Button>
                    </Tooltip>
                    <Tooltip content="Delete">
                        <Button
                            size="sm"
                            radius="full"
                            isIconOnly
                            variant='ghost'
                            color='primary'
                            className='text-white border-white'
                            aria-label="Delete Tasks"
                            onPress={onDeleteButtonClick}
                        >
                            <i className="bi bi-trash"></i>
                        </Button>
                    </Tooltip>
                </div>
            </CardFooter>
        </NextUICard>
    );
};

export default TaskCard;
