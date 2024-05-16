import { Avatar, Badge, Button, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, Input } from "@nextui-org/react";
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { useAuth } from "../context/AuthContext";
import { Avatars } from "../helpers/commonData";
import { TaskTabs } from "../helpers/enums";
import { getTasksDueToday, Task } from "../service/tasks";

interface TopbarProps {
    taskStatus: TaskTabs;
    searchKeyword: undefined | string;
    setSearchKeyword: (searchKeyword: string) => void;
    onNotificationPress: (task: Task) => void;
}

const Topbar: React.FC<TopbarProps> = ({ taskStatus, searchKeyword, setSearchKeyword, onNotificationPress }) => {
    const auth = useAuth();
    const [notificationList, setNotificationList] = useState<Task[]>([]);
    const avatarId: keyof typeof Avatars = auth?.authData?.user.avatarId || 'Avatar1';
    const avatarUrl = `/static/${Avatars[avatarId]}`;

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

    const handleAvatarChange = async (newAvatarId: keyof typeof Avatars) => {
        try {
            await auth?.updateAvatar(newAvatarId.toString());
        } catch (error) {
            console.error('Error updating avatar:', error);
        }
    };

    const ProfileComponent = () => (
        <Dropdown placement="bottom-end">
            <DropdownTrigger>
                <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    src={avatarUrl}
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
                        <div className="grid grid-cols-3 gap-4 py-4">
                            {Object.keys(Avatars).map((key) => (
                                <div key={key} className="flex justify-center items-center">
                                    <Avatar
                                        isBordered
                                        as="button"
                                        className="transition-transform"
                                        src={`/static/${Avatars[key as keyof typeof Avatars]}`}
                                        onClick={() => handleAvatarChange(key as keyof typeof Avatars)}
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
                <Image className="mx-auto" src='/static/logo2.png' width={70} height={100} alt='logo' />
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
