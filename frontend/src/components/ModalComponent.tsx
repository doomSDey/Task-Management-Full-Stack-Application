import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal"
import { Button, DatePicker, Radio, RadioGroup } from "@nextui-org/react"
import { Field, FieldProps,Form, Formik } from "formik";

import { ModalTypes } from "../helpers/enums"
import { FilterValues } from "../pages/home";

interface ModalComponentProps {
    initialValues?: FilterValues,
    type: ModalTypes,
    onAccept: (arg0: FilterValues) => void,
    onDecline: () => void,
    isOpen: boolean,
    onOpenChange: () => void,
}

interface ModalBodyComponentProps {
    type: ModalTypes,
    initialValues?: FilterValues,
    onClose: () => void,
    onAccept: (arg0: FilterValues) => void,
}

const ModalHeaderComponent: React.FC<Partial<ModalComponentProps>> = ({ type }) => {
    switch (type) {
        case ModalTypes.Filter:
            return (
                <ModalHeader className="flex flex-col gap-1">Filters</ModalHeader>
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
                        <ModalBodyComponent type={type} initialValues={initialValues} onClose={onClose} onAccept={onAccept}/>
                    </>
                )}
            </ModalContent>
        </Modal>
    )

}

export default ModalComponenet