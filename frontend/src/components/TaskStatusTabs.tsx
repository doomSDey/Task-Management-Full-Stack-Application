import { Tab, Tabs } from "@nextui-org/react"

import { TaskStatus } from "../helpers/enums"

interface TaskStatusTabsProps {
    selectedKey: TaskStatus,
    setSelectedKey: (key: TaskStatus) => void
}

const TaskStatusTabs: React.FC<TaskStatusTabsProps> = ({ selectedKey, setSelectedKey }) => {
    return (
        <div className="flex w-full flex-col">
            <Tabs
                aria-label="Options"
                selectedKey={selectedKey}
                onSelectionChange={(e)=>setSelectedKey(e as TaskStatus)}
            >
                <Tab key={TaskStatus.All} title="All Tasks" />
                <Tab key={TaskStatus.ToDo} title="To Do Tasks" />
                <Tab key={TaskStatus.InProgress} title="In Progress Tasks" />
                <Tab key={TaskStatus.Done} title="Done Tasks" />
            </Tabs>
        </div>
    )
}

export default TaskStatusTabs