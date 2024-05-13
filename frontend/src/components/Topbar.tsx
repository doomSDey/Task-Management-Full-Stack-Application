import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, Input } from "@nextui-org/react"

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
        <div className="flex gap-4 py-4">
            <Input
                type="text"
                placeholder={`Search in ${taskStatus}`}
                labelPlacement="outside"
                endContent={
                    <Button isIconOnly aria-label="Search">
                        <i className="bi bi-search"></i>
                    </Button>
                }
            />
            <Button isIconOnly aria-label="Notification">
                <i className="bi bi-bell"></i>
            </Button>
            <Dropdown placement="bottom-end">
                <DropdownTrigger>
                    <Avatar
                        isBordered
                        as="button"
                        className="transition-transform"
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
    )
}

export default Topbar
