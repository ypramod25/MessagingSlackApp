import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useDeleteWorkspace } from "@/hooks/apis/workspaces/useDeleteWorkspace";
import { useUpdateWorkspace } from "@/hooks/apis/workspaces/useUpdateWorkspace";
import { useWorkspacePreferencesModal } from "@/hooks/context/useWorkspacePreferencesModal";
import { useQueryClient } from "@tanstack/react-query";
import { TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from 'sonner'
import { useConfirm } from "@/hooks/useConfirm";

export const WorkspacePreferencesModal = () => {

    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [workspaceId, setWorkspaceId] = useState(null);
    const [editOpen, setEditOpen] = useState(false);

    const {confirmation, ConfirmDialog} = useConfirm({
        title: "Delete Workspace",
        message: "Are you sure you want to delete this workspace? All data will be lost."
    });

    const {confirmation:updateConfirmation, ConfirmDialog:UpdateConfirmDialog} = useConfirm({
        title: "Update Workspace",
        message: "Are you sure you want to update this workspace?"
    });

    const {initialValue, openPreferences, setOpenPreferences, workspace} = useWorkspacePreferencesModal();
    const {deleteWorkspaceMutation} = useDeleteWorkspace(workspaceId);
    const [renameValue, setRenameValue] = useState(workspace?.name);

    const {isFetching, updateWorkspaceMutation} = useUpdateWorkspace(workspaceId);

    useEffect(() => {
        setWorkspaceId(workspace?._id);
        setRenameValue(workspace?.name);
    }, [workspace]);

    async function handleDeleteWorkspace() {
        try {
            const confirmed = await confirmation();
            if (!confirmed) return;
            await deleteWorkspaceMutation();
            setOpenPreferences(false);
            await queryClient.invalidateQueries({
                queryKey: ['fetchWorkspace']
            });
            console.log("Invalidated");
            navigate('/home');
            console.log("Navigated");
        } catch (error) {
            console.log(error);
            toast.error('Failed to delete workspace');
        }
    }

    async function handleFormSubmit(e) {
        e.preventDefault();
        try {
            const ok = await updateConfirmation();
            if (!ok) return;
            await updateWorkspaceMutation(renameValue);
            setEditOpen(false);
            setRenameValue('');
            await queryClient.invalidateQueries({
                queryKey: [`fetchWorkspaceById-${workspaceId}`]
            });
            toast.success('Workspace updated successfully');
        } catch (error) {
            console.log('Error updating workspace:', error);
            toast.error('Failed to update workspace');
        }
    }

    return (
        <>
        <ConfirmDialog />
        <UpdateConfirmDialog />
        <Dialog open={openPreferences} onOpenChange={setOpenPreferences}>
            <DialogContent className='p-0 bg-gray-50 overflow-hidden'>
                <DialogHeader className='p-4 border-b bg-white'>
                    <DialogTitle>
                        {workspace?.name}
                    </DialogTitle> 
                    <DialogDescription >
                        Update your workspace preferences.
                    </DialogDescription>
                </DialogHeader>
                <div className="px-4 pb-4 flex flex-col gap-y-2">
                    <Dialog open={editOpen} onOpenChange={setEditOpen}>
                        <DialogTrigger>
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
                                    {workspace?.name}
                                </p>
                            </div>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Rename Workspace</DialogTitle>
                            </DialogHeader>
                            <form className="space-y-4" onSubmit={handleFormSubmit}>
                                <Input 
                                    value={renameValue}
                                    onChange={(e) => setRenameValue(e.target.value)}
                                    required
                                    autoFocus
                                    minLength={3}
                                    disabled={isFetching}
                                    maxLength={50}
                                    placeholder="Enter new workspace name"
                                />
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button
                                            variant='outline'
                                            disabled={isFetching}
                                        >
                                            Cancel
                                        </Button>
                                    </DialogClose>
                                    <DialogClose asChild>
                                        <Button
                                            type="submit"
                                            disabled={isFetching}
                                        >
                                            Save
                                        </Button>
                                    </DialogClose>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
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
        </>
    )
}