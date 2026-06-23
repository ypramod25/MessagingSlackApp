import { UserButton } from "@/components/atoms/UserButton/UserButton";
import { SidebarButton } from "@/components/molecules/SidebarButton/SidebarButton";
import {
    BellIcon,
    HomeIcon,
    MessageSquareIcon,
    MoreHorizontalIcon
} from "lucide-react";

export const WorkspaceSideBar = () => {
    return (
        <aside
            className="w-19.5 h-full bg-dark flex flex-col gap-y-4 items-center pt-2.5 pb-2"
        >
            <SidebarButton
                Icon={HomeIcon}
                label="home"
            />

            <SidebarButton
                Icon={MessageSquareIcon}
                label="DMs"
            />

            <SidebarButton
                Icon={BellIcon}
                label="notification"
            />

            <SidebarButton
                Icon={MoreHorizontalIcon}
                label="More"
            />

            <div className="flex flex-col items-center justify-center mt-auto gap-y-1 pb-5">
                <UserButton />
            </div>
        </aside>
    );
};