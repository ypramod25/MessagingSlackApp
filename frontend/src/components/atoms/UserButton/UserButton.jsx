import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/context/useAuth"
import { useCreateWorkspaceModal } from "@/hooks/context/useCreateWorkspaceModal";
import { LogOutIcon, PencilIcon, SettingsIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const UserButton = () => {
    const {auth, logout} = useAuth();
    const navigate = useNavigate();
    
    async function handleLogout() {
        await logout();
        toast.success("Successfully signed out");
        navigate('/auth/signin');
    }

    const {setOpenCreateWorkspaceModal} = useCreateWorkspaceModal();

    function openWorkspaceCreateModal() {
        setOpenCreateWorkspaceModal(true);
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="outline-none ">
                <Avatar>
                    <AvatarImage src={auth?.user?.avatar}/>
                    <AvatarFallback>{auth?.user?.username[0].toUpperCase()}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel className='text-center text-semibold '>
                    <div className="flex items-center gap-2">
                        <Avatar>
                            <AvatarImage src={auth?.user?.avatar}/>
                            <AvatarFallback>{auth?.user?.username[0].toUpperCase()}</AvatarFallback>
                        </Avatar>
                        {auth?.user?.username}
                    </div>
                </DropdownMenuLabel>
                <hr></hr>
                <DropdownMenuItem onClick={openWorkspaceCreateModal}>
                    <PencilIcon className="size-4 mr-2 h-10"/>
                    Create workspace
                </DropdownMenuItem>
                <DropdownMenuItem >
                    <SettingsIcon className="size-4 mr-2 h-10"/>
                    Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                    <LogOutIcon className="size-4 mr-2 h-10"/>
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}  