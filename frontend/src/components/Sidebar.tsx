import { Button } from '@nextui-org/react';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

import { ModalTypes } from '../helpers/enums';

interface SidebarProps {
    setModalType: (modalType: ModalTypes) => void;
    onOpen: () => void;
    setMultiDeleteActive: Dispatch<SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({
    setModalType,
    onOpen,
    setMultiDeleteActive,
}) => {
    return (
        <div className="fixed bottom-0 left-0 flex w-screen space-x-4 bg-default-100 p-4 text-white shadow-xl md:relative md:left-0 md:top-0 md:w-24 md:flex-col md:space-x-0 md:space-y-4">
            <div className="flex h-full w-full justify-center md:justify-normal">
                <div className="flex gap-4 md:flex-col md:mt-24 md:items-center">
                    <Image
                        className="mx-auto hidden md:block"
                        src="/static/logo2.png"
                        width={140}
                        height={140}
                        alt="logo"
                    />
                    <Button
                        isIconOnly
                        aria-label="Filters"
                        radius="full"
                        color='primary'
                        variant='ghost'
                        onPress={() => {
                            setModalType(ModalTypes.Filter), onOpen();
                        }}
                    >
                        <i className="bi bi-funnel"></i>
                    </Button>
                    <Button
                        isIconOnly
                        aria-label="Add Task"
                        color='primary'
                        variant="ghost"
                        radius="full"
                        onPress={() => {
                            setModalType(ModalTypes.CreateTask), onOpen();
                        }}
                    >
                        <i className="bi bi-plus-lg"></i>
                    </Button>
                    <Button
                        isIconOnly
                        aria-label="Delete Tasks"
                        color='primary'
                        variant="ghost"
                        radius="full"
                        onClick={() => {
                            setMultiDeleteActive(
                                (prevData: boolean) => !prevData
                            );
                        }}
                    >
                        <i className="bi bi-trash"></i>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
