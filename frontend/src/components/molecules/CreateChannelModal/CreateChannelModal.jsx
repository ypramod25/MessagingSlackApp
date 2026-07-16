import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateChannelModal } from "@/hooks/context/useCreateChannelModal";
import { useAddChannelToWorkspace } from "@/hooks/apis/workspaces/useAddChannelToWorkspace";
import { useCurrentWorkspace } from "@/hooks/context/useCurrentWorkspace";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export const CreateChannelModal = () => {
    const { openCreateChannelModal, setOpenCreateChannelModal } = useCreateChannelModal();
    const [channelName, setChannelName] = useState("");

    const {addChannelToWorkspaceMutation} = useAddChannelToWorkspace();

    const queryClient = useQueryClient();

    const {currentWorkspace} = useCurrentWorkspace();

    function handleClose() {
        setOpenCreateChannelModal(false);
    }

    async function handleFormSubmit(e) {
        e.preventDefault();
        await addChannelToWorkspaceMutation({
            workspaceId: currentWorkspace._id, 
            name: channelName
        });
        toast.success("Channel created successfully");

        await queryClient.invalidateQueries({
            queryKey: [`fetchWorkspaceById-${currentWorkspace?._id}`]
        });

        handleClose();
    }

    return (
        <Dialog open={openCreateChannelModal} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a new channel</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleFormSubmit}>
                    <Input
                        required
                        minLength={3}
                        placeholder="Put the channel name e.g. My channel"
                        value={channelName}
                        onChange={(e) => setChannelName(e.target.value)}
                    />
                    <div className="flex justify-end mt-4">
                        <Button>
                            Create
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}