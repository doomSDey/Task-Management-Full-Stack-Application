import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal"
import { Button, Checkbox, DatePicker, Input, Radio, RadioGroup, Select, SelectItem, Textarea } from "@nextui-org/react"
import { Field, FieldProps, Form, Formik } from "formik";

import { ModalTypes, TaskCardBackgroundColors, TaskStatus } from "../helpers/enums"
import { CardData, FilterValues } from "../pages/home";

interface ModalComponentProps {
    initialValues?: FilterValues | CardData,
    type: ModalTypes,
    onAccept: (arg0: FilterValues | CardData) => void,
    onDecline: () => void,
    isOpen: boolean,
    onOpenChange: () => void,
}

interface ModalBodyComponentProps {
    type: ModalTypes,
    initialValues?: FilterValues | CardData,
    onClose: () => void,
    onAccept: (arg0: FilterValues | CardData) => void,
}

const ModalHeaderComponent: React.FC<Partial<ModalComponentProps>> = ({ type }) => {
    switch (type) {
        case ModalTypes.Filter:
            return (
                <ModalHeader className="flex flex-col gap-1">Filters</ModalHeader>
            );
        case ModalTypes.EditTask:
            return (
                <ModalHeader className="flex flex-col gap-1">Edit Task</ModalHeader>
            );
        default:
            return null;
    }
};

const ModalBodyComponent: React.FC<ModalBodyComponentProps> = ({ type, initialValues, onClose, onAccept }) => {
    switch (type) {
        case ModalTypes.Filter:
            return (
                <Formik
                    initialValues={initialValues!}
                    onSubmit={(values) => {
                        console.log(values);
                        onAccept(values)
                        // Handle form submission
                    }}
                >
                    {({ setFieldValue }) => (
                        <Form className="space-y-4">
                            <ModalBody>
                                <div className="flex flex-col space-y-2">
                                    <label className="font-semibold">Date Range</label>
                                    <div className="flex space-x-2">
                                        <Field name="startDate">
                                            {({ field }: FieldProps) => (
                                                <DatePicker
                                                    {...field}
                                                    placeholder="Start Date"
                                                    className="w-full"
                                                    onChange={(date) => setFieldValue('startDate', date)}
                                                />
                                            )}
                                        </Field>
                                        <Field name="endDate">
                                            {({ field }: FieldProps) => (
                                                <DatePicker
                                                    {...field}
                                                    placeholder="End Date"
                                                    className="w-full"
                                                    onChange={(date) => setFieldValue('endDate', date)}
                                                />
                                            )}
                                        </Field>
                                    </div>
                                </div>
                                <div className="flex flex-col space-y-2">
                                    <label className="font-semibold">Sort By</label>
                                    <div className="flex space-x-4">
                                        <Field name="sortOption">
                                            {({ field }: FieldProps) => (
                                                <RadioGroup
                                                    {...field}
                                                    value={field.value}
                                                    onValueChange={(value) => setFieldValue('sortOption', value)}
                                                    orientation="horizontal"
                                                >
                                                    <Radio value="title">Title</Radio>
                                                    <Radio value="date">Date of Creation</Radio>
                                                </RadioGroup>
                                            )}
                                        </Field>
                                    </div>
                                </div>
                                <div className="flex flex-col space-y-2">
                                    <label className="font-semibold">Sort Order</label>
                                    <div className="flex space-x-4">
                                        <Field name="sortOrder">
                                            {({ field }: FieldProps) => (
                                                <RadioGroup
                                                    {...field}
                                                    value={field.value}
                                                    onValueChange={(value) => setFieldValue('sortOrder', value)}
                                                    orientation="horizontal"
                                                >
                                                    <Radio value="asc">Ascending</Radio>
                                                    <Radio value="desc">Descending</Radio>
                                                </RadioGroup>
                                            )}
                                        </Field>
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button variant="flat" type="button" onPress={() => {
                                    onClose()
                                }}>
                                    Cancel
                                </Button>
                                <Button type="submit">
                                    Accept
                                </Button>
                            </ModalFooter>
                        </Form>
                    )}
                </Formik>
            );
        case ModalTypes.EditTask:
            return (
                <Formik
                    initialValues={initialValues!}
                    onSubmit={(values) => {
                        console.log(values);
                        onAccept(values);
                    }}
                >
                    {({ setFieldValue }) => (
                        <Form className="space-y-4">
                            <ModalBody>
                                <div className="flex flex-col space-y-2">
                                    <label className="font-semibold">Title</label>
                                    <Field name="title">
                                        {({ field }: FieldProps) => (
                                            <Input {...field} placeholder="Title" className="w-full" />
                                        )}
                                    </Field>
                                </div>
                                <div className="flex flex-col space-y-2">
                                    <label className="font-semibold">Description</label>
                                    <Field name="description">
                                        {({ field }: FieldProps) => (
                                            <Textarea {...field} placeholder="Description" className="w-full" />
                                        )}
                                    </Field>
                                </div>
                                <div className="flex flex-col space-y-2">
                                    <label className="font-semibold">Due Date (Optional)</label>
                                    <Field name="dueDate">
                                        {({ field }: FieldProps) => (
                                            <DatePicker
                                                {...field}
                                                placeholder="Due Date"
                                                className="w-full"
                                                onChange={(date) => setFieldValue('dueDate', date)}
                                            />
                                        )}
                                    </Field>
                                </div>
                                <div className="flex flex-col space-y-2">
                                    <label className="font-semibold">Status</label>
                                    <Field name="status">
                                        {({ field }: FieldProps) => (
                                            <Select
                                                {...field}
                                                placeholder="Select current status"
                                                selectedKeys={[field.value]}
                                                onSelectionChange={(value) => setFieldValue('status', value)}
                                                size='sm'
                                            >
                                                {Object.values(TaskStatus).map((item) => (
                                                    <SelectItem key={item} value={item}>
                                                        {item}
                                                    </SelectItem>
                                                ))}
                                            </Select>
                                        )}
                                    </Field>
                                </div>
                                <div className="flex flex-col space-y-2">
                                    <label className="font-semibold">Color (Optional)</label>
                                    <Field name="color">
                                        {({ field }: FieldProps) => (
                                            <div className="flex gap-4">
                                                {Object.values(TaskCardBackgroundColors).map((color) => (
                                                    <div
                                                        key={color}
                                                        className={`w-8 h-8 rounded-full cursor-pointer ${field.value === color ? 'border-2 border-black' : ''}`}
                                                        style={{ backgroundColor: color }}
                                                        onClick={() => setFieldValue('color', color)}
                                                    ></div>
                                                ))}
                                            </div>
                                        )}
                                    </Field>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button variant="flat" type="button" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button type="submit">
                                    Save
                                </Button>
                            </ModalFooter>
                        </Form>
                    )}
                </Formik>
            );
        default:
            return null;
    }
};

const ModalComponenet: React.FC<ModalComponentProps> = ({ type, isOpen, onOpenChange, onAccept, initialValues }) => {
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeaderComponent type={type} />
                        <ModalBodyComponent type={type} initialValues={initialValues} onClose={onClose} onAccept={onAccept} />
                    </>
                )}
            </ModalContent>
        </Modal>
    )

}

export default ModalComponenet