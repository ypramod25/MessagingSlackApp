import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useDeleteWorkspace } from "@/hooks/apis/workspaces/useDeleteWorkspace";
import { useWorkspacePreferencesModal } from "@/hooks/context/useWorkspacePreferencesModal";
import { useQueryClient } from "@tanstack/react-query";
import { TrashIcon } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const WorkspacePreferencesModal = () => {

    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [workspaceid, setWorkspaceId] = useState(null);

    const {initialValue, openPreferences, setOpenPreferences, workspace} = useWorkspacePreferencesModal();
    const {deleteWorkspaceMutation} = useDeleteWorkspace(workspace?._id);

    useEffect(() => {
        setWorkspaceId(workspace._id);
    }, [workspace]);

    async function handleDeleteWorkspace() {
        try {
            console.log("Deleting...");
            await deleteWorkspaceMutation();
            setOpenPreferences(false);
            console.log("Deleted");
            await queryClient.invalidateQueries({
                queryKey: ['fetchWorkspace']
            });
            console.log("Invalidated");
            navigate('/home');
            console.log("Navigated");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Dialog open={openPreferences} onOpenChange={setOpenPreferences}>
            <DialogContent className='p-0 bg-gray-50 overflow-hidden'>
                <DialogHeader className='p-4 border-b bg-white'>
                    <DialogTitle>
                        lavda
                    </DialogTitle> 
                    <DialogDescription >
                        Update your workspace preferences.
                    </DialogDescription>
                </DialogHeader>
                <div className="px-4 pb-4 flex flex-col gap-y-2">
                    <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center justify-between">
                            <p className="font-semibold text-sm">
                                Workspace Name
                            </p>
                            <p className="text-sm font-semibold text-blue-500 hover:underline">
                                Edit
                            </p>
                        </div>
                        <p className="text-sm font-semibold text-gray-500 mt-1">
                            {initialValue}
                        </p>
                    </div>
                        <button 
                            className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50"
                            onClick={handleDeleteWorkspace}
                            >
                            <TrashIcon className="size-5"/>
                            <p className="text-sm font-semibold text-red-500 hover:underline">
                                Delete Workspace
                            </p>
                        </button>
                </div>
            </DialogContent>
        </Dialog>
    )
}