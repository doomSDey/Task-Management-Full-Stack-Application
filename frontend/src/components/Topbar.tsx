import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, Input } from "@nextui-org/react"
import Image from 'next/image'

import { TaskStatus } from "../helpers/enums";

interface TopbarProps {
    taskStatus: TaskStatus;
}

const avatarUrlList = [
    'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    'https://i.pravatar.cc/150?u=a042581f4e29026704d',
]

const Topbar: React.FC<TopbarProps> = ({ taskStatus }) => {
    return (
        <div className="flex flex-col md:flex-row gap-4 py-4">
            <div className="flex justify-between items-center w-full md:w-auto">
                <Avatar
                    isBordered
                    as="button"
                    className="transition-transform md:hidden"
                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
                <Image className="md:hidden mx-auto" src='/logo.png' width={70} height={100} alt='logo' />
                <Button isIconOnly aria-label="Notification" className="md:hidden">
                    <i className="bi bi-bell"></i>
                </Button>
            </div>
            <div className="w-full">
                <Input
                    type="text"
                    placeholder={`Search in ${taskStatus}`}
                    labelPlacement="outside"
                    className="w-full md:w-auto"
                    endContent={
                        <Button isIconOnly variant="ghost" className="outline-none border-none" aria-label="Search">
                            <i className="bi bi-search"></i>
                        </Button>
                    }
                />
            </div>
            <Button isIconOnly aria-label="Notification" className="hidden md:block">
                <i className="bi bi-bell"></i>
            </Button>
            <Dropdown placement="bottom-end">
                <DropdownTrigger>
                    <Avatar
                        isBordered
                        as="button"
                        className="transition-transform hidden md:block"
                        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                    />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                    <DropdownItem key="profile" className="h-14 gap-2">
                        <p className="font-semibold">Signed in as</p>
                        <p className="font-semibold">zoey</p>
                        <p className="font-semibold">zoey@example.com</p>
                    </DropdownItem>
                    <DropdownSection title="Change avatar" showDivider>
                        {
                            avatarUrlList.map((avatar, index) => (
                                <DropdownItem key={index} className="h-14 gap-2">
                                    <Avatar
                                        as="button"
                                        className="transition-transform"
                                        src={avatar}
                                    />
                                </DropdownItem>
                            ))
                        }
                    </DropdownSection>
                    <DropdownItem key="logout" color="danger">
                        Log Out
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
};

export default Topbar
