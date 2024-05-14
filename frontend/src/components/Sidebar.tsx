import { Button } from "@nextui-org/react";
import Image from 'next/image'
import { Dispatch, SetStateAction } from "react";

import { ModalTypes } from "../helpers/enums";

interface SidebarProps {
    setModalType: (modalType: ModalTypes) => void,
    onOpen: () => void,
    setMultiDeleteActive: Dispatch<SetStateAction<boolean>>
}

const Sidebar: React.FC<SidebarProps> = ({ setModalType, onOpen, setMultiDeleteActive }) => {
    return (
        <div className="fixed md:relative bottom-0 left-0 md:top-0 md:left-0 w-full md:w-24 shadow-xl text-white flex md:flex-col p-4 space-x-4 md:space-x-0 md:space-y-4">
            <div className="h-full w-full flex justify-center md:justify-normal">
                <div className="md:flex-col flex gap-4">
                    <Image className="hidden md:block mx-auto" src='/logo.png' width={70} height={100} alt='logo' />
                    <Button isIconOnly aria-label="Filters" onPress={() => { setModalType(ModalTypes.Filter), onOpen() }}>
                        <i className="bi bi-funnel"></i>
                    </Button>
                    <Button isIconOnly aria-label="Add Task" onPress={() => { setModalType(ModalTypes.CreateTask), onOpen() }}>
                        <i className="bi bi-plus-lg"></i>
                    </Button>
                    <Button isIconOnly color="warning" aria-label="Delete Tasks" onClick={() => { setMultiDeleteActive((prevData: boolean) => !prevData) }}>
                        <i className="bi bi-trash"></i>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
