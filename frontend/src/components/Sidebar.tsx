import { Button } from "@nextui-org/react";

const Sidebar: React.FC = () => {
    return (
        <div className="fixed md:relative bottom-0 left-0 md:top-0 md:left-0 w-full md:w-24 shadow-xl text-white flex md:flex-col p-4 space-x-4 md:space-x-0 md:space-y-4">
            <div className="h-full w-full flex justify-between">
                <div className="md:flex-col flex gap-4">
                    <Button isIconOnly aria-label="Add Task">
                        <i className="bi bi-plus-lg"></i>
                    </Button>
                    <Button isIconOnly color="warning" aria-label="Delete Tasks">
                        <i className="bi bi-trash"></i>
                    </Button>
                </div>
            </div>
            <div>
                <Button isIconOnly color="danger" aria-label="Logout">
                    <i className="bi bi-box-arrow-right"></i>
                </Button>
            </div>
        </div>
    );
};

export default Sidebar;
