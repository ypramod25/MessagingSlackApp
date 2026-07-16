import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateChannelModal } from "@/hooks/context/useCreateChannelModal";

export const CreateChannelModal = () => {
    const { openCreateChannelModal, setOpenCreateChannelModal } = useCreateChannelModal();
    const [channelName, setChannelName] = useState("");

    function handleClose() {
        setOpenCreateChannelModal(false);
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        // Handle form submission logic here
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