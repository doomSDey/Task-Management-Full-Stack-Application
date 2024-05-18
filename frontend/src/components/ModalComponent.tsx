import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from '@nextui-org/modal';
import {
    Button,
    DatePicker,
    Input,
    Radio,
    RadioGroup,
    Select,
    SelectItem,
    Textarea,
} from '@nextui-org/react';
import { ErrorMessage, Field, FieldProps, Form, Formik } from 'formik';
import { Dispatch, SetStateAction } from 'react';
import * as Yup from 'yup';

import {
    ModalTypes,
    TaskCardBackgroundColors,
    TaskStatus,
} from '../helpers/enums';
import { DeleteCards, FilterValues } from '../pages/home';
import { createTask, deleteTasks, Task, updateTask } from '../service/tasks';

//todo: refactor into a proper factory
interface ModalComponentProps {
    initialValues?: FilterValues | Partial<Task> | DeleteCards;
    type: ModalTypes;
    onAccept: (arg0?: FilterValues) => void;
    isOpen: boolean;
    onOpenChange: () => void;
    updateData: Dispatch<SetStateAction<number>>;
}

interface ModalBodyComponentProps {
    type: ModalTypes;
    initialValues?: FilterValues | Partial<Task> | DeleteCards;
    onClose: () => void;
    onAccept: (arg0?: FilterValues) => void;
    updateData: Dispatch<SetStateAction<number>>;
}

function isDeleteCards(
    values: FilterValues | Partial<Task> | DeleteCards | undefined
): values is DeleteCards {
    console.log('asdas', (values as DeleteCards).taskIds !== undefined);
    return (values as DeleteCards).taskIds !== undefined;
}

const ModalHeaderComponent: React.FC<Partial<ModalComponentProps>> = ({
    type,
    initialValues,
}) => {
    switch (type) {
        case ModalTypes.Filter:
            return (
                <ModalHeader className="flex flex-col gap-1">
                    Filters
                </ModalHeader>
            );
        case ModalTypes.CreateTask:
            return (
                <ModalHeader className="flex flex-col gap-1">
                    Add a New Task
                </ModalHeader>
            );
        case ModalTypes.EditTask:
            return (
                <ModalHeader className="flex flex-col gap-1">
                    Edit Task
                </ModalHeader>
            );
        case ModalTypes.ViewTask:
            return (
                <ModalHeader className="flex flex-col gap-1">
                    View Task
                </ModalHeader>
            );
        case ModalTypes.DeleteCard:
            return (
                <ModalHeader className="flex flex-col gap-1">
                    {isDeleteCards(initialValues) &&
                        `Are you sure you want to delete ${initialValues.taskTitle && initialValues.taskTitle} task?`}
                </ModalHeader>
            );
        case ModalTypes.DeleteCards:
            return (
                <ModalHeader className="flex flex-col gap-1">
                    {isDeleteCards(initialValues) &&
                        `Are you sure you want to delete ${initialValues.taskIds.length} tasks?`}
                </ModalHeader>
            );
        default:
            return null;
    }
};

const ModalBodyComponent: React.FC<ModalBodyComponentProps> = ({
    type,
    initialValues,
    onClose,
    onAccept,
    updateData,
}) => {
    const createEditValidationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
        status: Yup.string().required('Status is required'),
        color: Yup.string().required('Color is required'),
    });

    switch (type) {
        case ModalTypes.Filter:
            return (
                <Formik
                    initialValues={initialValues!}
                    onSubmit={(values) => {
                        console.log(values);
                        onAccept(values as FilterValues);
                        // Handle form submission
                    }}
                >
                    {({ setFieldValue }) => (
                        <Form className="space-y-4">
                            <ModalBody className='flex-col space-y-4'>
                                <div className="flex space-x-2">
                                    <Field name="startDate">
                                        {({ field }: FieldProps) => (
                                            <DatePicker
                                                {...field}
                                                label="Start Date"
                                                placeholder="Start Date"
                                                radius="full"
                                                labelPlacement='outside'
                                                className="w-full"
                                                onChange={(date) =>
                                                    setFieldValue(
                                                        'startDate',
                                                        date
                                                    )
                                                }
                                            />
                                        )}
                                    </Field>
                                    <Field name="endDate">
                                        {({ field }: FieldProps) => (
                                            <DatePicker
                                                {...field}
                                                placeholder="End Date"
                                                label="End Date"
                                                radius="full"
                                                labelPlacement='outside'
                                                className="w-full"
                                                onChange={(date) =>
                                                    setFieldValue(
                                                        'endDate',
                                                        date
                                                    )
                                                }
                                            />
                                        )}
                                    </Field>
                                </div>
                                <div className="flex flex-col space-y-2">
                                    <Field name="sortOption">
                                        {({ field }: FieldProps) => (
                                            <RadioGroup
                                                {...field}
                                                label="Sort By"
                                                value={field.value}
                                                onValueChange={(value) =>
                                                    setFieldValue(
                                                        'sortOption',
                                                        value
                                                    )
                                                }
                                                orientation="horizontal"
                                            >
                                                <Radio value="title">
                                                    Title
                                                </Radio>
                                                <Radio value="createdAt">
                                                    Date of Creation
                                                </Radio>
                                            </RadioGroup>
                                        )}
                                    </Field>
                                </div>
                                <div className="flex flex-col space-y-2">
                                    <Field name="sortOrder">
                                        {({ field }: FieldProps) => (
                                            <RadioGroup
                                                {...field}
                                                value={field.value}
                                                label="Sort Order"
                                                onValueChange={(value) =>
                                                    setFieldValue(
                                                        'sortOrder',
                                                        value
                                                    )
                                                }
                                                orientation="horizontal"
                                            >
                                                <Radio value="asc">
                                                    Ascending
                                                </Radio>
                                                <Radio value="desc">
                                                    Descending
                                                </Radio>
                                            </RadioGroup>
                                        )}
                                    </Field>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    variant="ghost"
                                    radius='full'
                                    type="button"
                                    onPress={() => {
                                        onClose();
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" radius='full' className='text-white'>Accept</Button>
                            </ModalFooter>
                        </Form>
                    )}
                </Formik>
            );
        case ModalTypes.CreateTask:
        case ModalTypes.EditTask:
        case ModalTypes.ViewTask:
            return (
                <Formik
                    initialValues={initialValues! as Task}
                    validationSchema={createEditValidationSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        console.log(values);
                        const {
                            id,
                            title,
                            description,
                            status,
                            dueDate,
                            color,
                        } = values as Task;
                        if (type === ModalTypes.CreateTask) {
                            try {
                                await createTask({
                                    title,
                                    description,
                                    status,
                                    dueDate: dueDate
                                        ? new Date(
                                            dueDate as string
                                        ).toISOString()
                                        : dueDate,
                                    color,
                                });
                                updateData((prev) => prev + 1);
                                onClose();
                            } catch (error) {
                                console.error('Error creating task:', error);
                            } finally {
                                setSubmitting(false);
                            }
                        } else if (type === ModalTypes.EditTask) {
                            try {
                                await updateTask({
                                    taskId: id,
                                    title,
                                    description,
                                    status,
                                    dueDate: new Date(
                                        dueDate as string
                                    ).toISOString(),
                                    color,
                                });
                                updateData((prev) => prev + 1);
                                onClose();
                            } catch (error) {
                                console.error('Error creating task:', error);
                            } finally {
                                setSubmitting(false);
                            }
                            setSubmitting(false);
                        } else if (type === ModalTypes.ViewTask) {
                            onAccept();
                        } else {
                            setSubmitting(false);
                        }
                    }}
                >
                    {({ setFieldValue, isSubmitting, errors }) => (
                        <Form className="space-y-">
                            <ModalBody className='flex-col gap-y-6'>
                                <Field name="title">
                                    {({ field }: FieldProps) => (
                                        <Input
                                            {...field}
                                            disabled={
                                                ModalTypes.ViewTask === type
                                            }
                                            radius="full"
                                            placeholder="Title"
                                            label="Title"
                                            errorMessage={errors.title}
                                            isInvalid={errors.title ? true : false}
                                            labelPlacement='outside'
                                            classNames={{ label: 'pl-4', errorMessage: 'pl-4' }}
                                            className="w-full"
                                        />
                                    )}
                                </Field>
                                <Field name="description">
                                    {({ field }: FieldProps) => (
                                        <Textarea
                                            {...field}
                                            disabled={
                                                ModalTypes.ViewTask === type
                                            }
                                            radius="full"
                                            placeholder="Description"
                                            label='Description'
                                            errorMessage={errors.description}
                                            isInvalid={errors.description ? true : false}
                                            labelPlacement='outside'
                                            classNames={{ label: 'pl-4', errorMessage: 'pl-4' }}
                                            className="w-full"
                                        />
                                    )}
                                </Field>
                                <Field name="dueDate">
                                    {({ field }: FieldProps) => (
                                        <DatePicker
                                            {...field}
                                            onChange={(date) =>
                                                setFieldValue(
                                                    'dueDate',
                                                    date
                                                )
                                            }
                                            isRequired={false}
                                            radius="full"
                                            placeholder="Due Date"
                                            label="Due Date"
                                            isReadOnly={ModalTypes.ViewTask === type}
                                            errorMessage={errors.dueDate}
                                            isInvalid={errors.dueDate ? true : false}
                                            labelPlacement='outside'
                                            classNames={{ label: 'color:#FFFFFF' }}
                                            className="w-full custom-label"
                                        />
                                    )}
                                </Field>
                                <Field name="status">
                                    {({ field }: FieldProps) => (
                                        <Select
                                            {...field}
                                            isDisabled={
                                                ModalTypes.ViewTask === type
                                            }
                                            radius="full"
                                            placeholder="Select current status"
                                            label="Status"
                                            errorMessage={errors.status}
                                            isInvalid={errors.status ? true : false}
                                            selectedKeys={[field.value]}
                                            labelPlacement='outside'
                                            classNames={{ label: 'pl-4', errorMessage: 'pl-4' }}
                                            onSelectionChange={(value) =>
                                                setFieldValue(
                                                    'status',
                                                    value
                                                )
                                            }
                                        >
                                            {Object.values(TaskStatus).map(
                                                (item) => (
                                                    <SelectItem
                                                        key={item}
                                                        value={item}
                                                    >
                                                        {item}
                                                    </SelectItem>
                                                )
                                            )}
                                        </Select>
                                    )}
                                </Field>
                                <Field name="color" label="Color">
                                    {({ field }: FieldProps) => (
                                        <div className="flex gap-4">
                                            {Object.values(
                                                TaskCardBackgroundColors
                                            ).map((color) => (
                                                <div
                                                    key={color}
                                                    className={`h-8 w-8 cursor-pointer rounded-full ${field.value === color ? 'border-2 border-black' : ''}`}
                                                    style={{
                                                        backgroundColor:
                                                            color,
                                                    }}
                                                    onClick={() => {
                                                        if (
                                                            ModalTypes.ViewTask ===
                                                            type
                                                        )
                                                            return;
                                                        setFieldValue(
                                                            'color',
                                                            color
                                                        );
                                                    }}
                                                ></div>
                                            ))}
                                        </div>
                                    )}
                                </Field>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    variant="ghost"
                                    radius='full'
                                    type="button"
                                    onPress={onClose}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={isSubmitting} radius='full' className='text-white'>
                                    {ModalTypes.ViewTask === type
                                        ? 'Edit'
                                        : 'Save'}
                                </Button>
                            </ModalFooter>
                        </Form>
                    )}
                </Formik>
            );
        case ModalTypes.DeleteCard:
        case ModalTypes.DeleteCards:
            return (
                <>
                    <ModalBody>
                        <p>Are you sure?</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            variant="ghost"
                            radius='full'
                            type="button"
                            onPress={() => {
                                onClose();
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            radius='full'
                            className='text-white'
                            onPress={() => {
                                const deleteValues =
                                    initialValues! as DeleteCards;
                                deleteTasks(deleteValues.taskIds).then(
                                    () => {
                                        onAccept();
                                        updateData((prev) => prev + 1);
                                        onClose();
                                    }
                                );
                            }}
                        >
                            Accept
                        </Button>
                    </ModalFooter>
                </>
            );
        default:
            return null;
    }
};

const ModalComponenet: React.FC<ModalComponentProps> = ({
    type,
    isOpen,
    onOpenChange,
    onAccept,
    initialValues,
    updateData,
}) => {
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeaderComponent
                            type={type}
                            initialValues={initialValues}
                        />
                        <ModalBodyComponent
                            type={type}
                            initialValues={initialValues}
                            onClose={onClose}
                            onAccept={onAccept}
                            updateData={updateData}
                        />
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default ModalComponenet;
