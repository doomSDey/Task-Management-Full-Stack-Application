import { Avatar, Badge, Button, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, Input } from "@nextui-org/react";
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { useAuth } from "../context/AuthContext";
import { TaskTabs } from "../helpers/enums";
import { getTasksDueToday, Task } from "../service/tasks";

interface TopbarProps {
    taskStatus: TaskTabs;
    searchKeyword: undefined | string;
    setSearchKeyword: (searchKeyword: string) => void;
    onNotificationPress: (task: Task) => void
}

const avatarUrlList = [
    'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    'https://i.pravatar.cc/150?u=a042581f4e29026704d',
];

const Topbar: React.FC<TopbarProps> = ({ taskStatus, searchKeyword, setSearchKeyword, onNotificationPress }) => {
    const auth = useAuth();
    const [notificationList, setNotificationList] = useState<Task[]>([]);

    useEffect(() => {
        const fetchTasksDueToday = async () => {
            try {
                const tasksDueToday = await getTasksDueToday();
                setNotificationList(tasksDueToday);
            } catch (error) {
                console.error('Error fetching tasks due today:', error);
            }
        };

        fetchTasksDueToday();
    }, [auth]);

    const ProfileComponent = () => (
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
                    <p className="font-semibold">{auth?.authData?.user.username}</p>
                    <p className="font-semibold">{auth?.authData?.user.email}</p>
                </DropdownItem>
                <DropdownSection title="Change avatar" showDivider>
                    <DropdownItem className="cursor-default" isReadOnly>
                        <div className="grid grid-cols-3 gap-4 ">
                            {avatarUrlList.map((avatar, index) => (
                                <div key={index} className="flex justify-center items-center">
                                    <Avatar
                                        as="button"
                                        className="transition-transform"
                                        src={avatar}
                                    />
                                </div>
                            ))}
                        </div>
                    </DropdownItem>
                </DropdownSection>
                <DropdownItem key="logout" color="danger" onPress={auth?.signOut}>
                    Log Out
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );

    const NotificationComponent = () => (
        <Dropdown placement="bottom-end">
            <Badge content={notificationList.length} color="primary">
                <DropdownTrigger>
                    <Button isIconOnly aria-label="Notification">
                        <i className="bi bi-bell"></i>
                    </Button>
                </DropdownTrigger>
            </Badge>
            <DropdownMenu aria-label="Notification List" variant="flat">
                <DropdownItem className="cursor-default" isReadOnly>
                    {notificationList.map((notification, index) => (
                        <div key={index} className="w-full">
                            <Button variant="ghost" className="w-full flex items-center justify-start space-x-2 border-none max-w-48" startContent={<i className="bi bi-bell"></i>} onPress={() => onNotificationPress(notification)}>
                                <p className="text-ellipsis overflow-hidden whitespace-nowrap">{notification.title} is due today</p>
                            </Button>
                        </div>
                    ))}
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );

    return (
        <div className="flex flex-col md:flex-row gap-4 py-4">
            {/* Logo, Profile, and Notification for small screens */}
            <div className="flex md:hidden justify-between items-center w-full">
                <ProfileComponent />
                <Image className="mx-auto" src='/logo.png' width={70} height={100} alt='logo' />
                <NotificationComponent />
            </div>
            {/* Search bar for small screens */}
            <div className="md:hidden w-full">
                <Input
                    type="text"
                    placeholder={`Search in ${taskStatus}`}
                    labelPlacement="outside"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    className="w-full"
                    endContent={
                        <i className="bi bi-search"></i>
                    }
                />
            </div>
            {/* Search bar, Notification, and Profile for larger screens */}
            <div className="hidden md:flex md:items-center w-full gap-4">
                <Input
                    type="text"
                    placeholder={`Search in ${taskStatus}`}
                    labelPlacement="outside"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    className="flex-grow"
                    endContent={
                        <i className="bi bi-search"></i>
                    }
                />
                <NotificationComponent />
                <ProfileComponent />
            </div>
        </div>
    );
};

export default Topbar;
