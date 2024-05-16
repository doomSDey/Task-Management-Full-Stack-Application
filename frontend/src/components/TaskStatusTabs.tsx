import { Tab, Tabs } from '@nextui-org/react';

import { TaskTabs } from '../helpers/enums';

interface TaskStatusTabsProps {
    selectedKey: TaskTabs;
    setSelectedKey: (key: TaskTabs) => void;
}

const TaskStatusTabs: React.FC<TaskStatusTabsProps> = ({
    selectedKey,
    setSelectedKey,
}) => {
    return (
        <div className="flex w-full flex-col items-center">
            <Tabs
                aria-label="Options"
                selectedKey={selectedKey}
                onSelectionChange={(e) => setSelectedKey(e as TaskTabs)}
                size="lg"
                radius="full"
                classNames={{ tab: 'm-1', tabList: 'w-full' }}
                className="w-full md:w-5/6"
            >
                <Tab key={TaskTabs.All} title="All Tasks" />
                <Tab key={TaskTabs.ToDo} title="To Do Tasks" />
                <Tab key={TaskTabs.InProgress} title="In Progress Tasks" />
                <Tab key={TaskTabs.Done} title="Done Tasks" />
            </Tabs>
        </div>
    );
};

export default TaskStatusTabs;
