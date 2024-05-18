import {
    Avatar,
    Badge,
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownSection,
    DropdownTrigger,
    Input,
} from '@nextui-org/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { useAuth } from '../context/AuthContext';
import { Avatars } from '../helpers/commonData';
import { TaskTabs } from '../helpers/enums';
import { getTasksDueToday, Task } from '../service/tasks';

interface TopbarProps {
    taskStatus: TaskTabs;
    searchKeyword: undefined | string;
    setSearchKeyword: (searchKeyword: string) => void;
    onNotificationPress: (task: Task) => void;
}

const Topbar: React.FC<TopbarProps> = ({
    taskStatus,
    searchKeyword,
    setSearchKeyword,
    onNotificationPress,
}) => {
    const auth = useAuth();
    const [notificationList, setNotificationList] = useState<Task[]>([]);
    const avatarId: keyof typeof Avatars =
        auth?.authData?.user.avatarId || 'Avatar1';
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
                    color='primary'
                    size="lg"
                    src={avatarUrl}
                />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat" className='p-5'>
                <DropdownSection showDivider>
                    <DropdownItem key="profile" className="h-14 gap-2">
                        <p className="font-semibold text-lg pb-2">Signed in as: {auth?.authData?.user.username}</p>
                        <p >
                            {auth?.authData?.user.email}
                        </p>
                    </DropdownItem>
                </DropdownSection>
                <DropdownSection title="Change avatar" showDivider>
                    <DropdownItem className="cursor-default" isReadOnly>
                        <div className="grid grid-cols-3 gap-10 px-2 py-4">
                            {Object.keys(Avatars).map((key) => (
                                <div
                                    key={key}
                                    className="flex items-center justify-center"
                                >
                                    <Avatar
                                        isBordered
                                        as="button"
                                        className="transition-transform"
                                        size='lg'
                                        src={`/static/${Avatars[key as keyof typeof Avatars]}`}
                                        onClick={() =>
                                            handleAvatarChange(
                                                key as keyof typeof Avatars
                                            )
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                    </DropdownItem>
                </DropdownSection>
                <DropdownItem
                    key="logout"
                    color="danger"
                    onPress={auth?.signOut}
                >
                    Log Out
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );

    const NotificationComponent = () => (
        <Dropdown placement="bottom-end">
            <Badge content={notificationList.length} color="primary">
                <DropdownTrigger>
                    <Button
                        isIconOnly
                        aria-label="Notification"
                        size="lg"
                        color='primary'
                        radius="full"
                        variant="ghost"
                    >
                        <i className="bi bi-bell"></i>
                    </Button>
                </DropdownTrigger>
            </Badge>
            <DropdownMenu aria-label="Notification List" variant="flat">
                <DropdownItem className="cursor-default" isReadOnly>
                    {
                        notificationList.length === 0 &&
                        <p>Nothing pending today!</p>
                    }
                    {notificationList.map((notification, index) => (
                        <div key={index} className="w-full">
                            <Button
                                variant="ghost"
                                className="flex w-full max-w-48 items-center justify-start space-x-2 border-none"
                                startContent={<i className="bi bi-bell"></i>}
                                onPress={() =>
                                    onNotificationPress(notification)
                                }
                            >
                                <p className="overflow-hidden text-ellipsis whitespace-nowrap">
                                    {notification.title} is due today
                                </p>
                            </Button>
                        </div>
                    ))}
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );

    return (
        <div className="flex w-full flex-col justify-center gap-4 py-4 md:flex-row">
            {/* Logo, Profile, and Notification for small screens */}
            <div className="w-full md:w-5/6">
                <div className="flex w-full items-center justify-between md:hidden">
                    <ProfileComponent />
                    <Image
                        className="mx-auto"
                        src="/static/logo2.png"
                        width={70}
                        height={100}
                        alt="logo"
                    />
                    <NotificationComponent />
                </div>
                {/* Search bar for small screens */}
                <div className="w-full pb-2 pt-4 md:hidden">
                    <Input
                        type="text"
                        placeholder={`Search in ${taskStatus}`}
                        labelPlacement="outside"
                        value={searchKeyword}
                        radius="full"
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        className="w-full"
                        color="default"
                        endContent={<i className="bi bi-search"></i>}
                    />
                </div>
                {/* Search bar, Notification, and Profile for larger screens */}
                <div className="hidden w-full gap-4 md:flex md:items-center">
                    <Input
                        type="text"
                        size="lg"
                        placeholder={`Search in ${taskStatus}`}
                        labelPlacement="outside"
                        radius="full"
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        className="flex-grow"
                        endContent={<i className="bi bi-search"></i>}
                    />
                    <NotificationComponent />
                    <ProfileComponent />
                </div>
            </div>
        </div>
    );
};

export default Topbar;
