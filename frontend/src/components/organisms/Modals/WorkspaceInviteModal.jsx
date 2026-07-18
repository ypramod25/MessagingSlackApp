import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useResetJoinCode } from "@/hooks/apis/workspaces/useResetJoinCode";
import { CopyIcon, RefreshCwIcon } from "lucide-react"
import { toast } from "sonner";

export const WorkspaceInviteModal = ({openInviteModal, setOpenInviteModal, workspaceName, joinCode, workspaceId }) => {

    async function handleCopy () {
        const inviteLink = `${window.location.origin}/join/${joinCode}`;
        await navigator.clipboard.writeText(inviteLink);
        toast.success('Copied to Clipboard')
    }

    const {resetJoinCodeMutation} = useResetJoinCode(workspaceId);

    async function handleResetCode() {
        try {
            await resetJoinCodeMutation();
            toast.success('JoinCode reset Successfully');
        } catch (error) {
            console.log('Error in resetting the join code', error);
        }
    }
    
    return (
        <Dialog open={openInviteModal} onOpenChange={setOpenInviteModal}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Invite people to {workspaceName}
                    </DialogTitle>
                    <DialogDescription>
                        Use the codee shown below to invite people to your workspace.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col items-center justify-center py-10 gap-y-4">
                    <p className="font-bold text-4xl uppercase">
                        {joinCode}
                    </p>
                    <Button size="sm" variant="ghost" onClick={handleCopy}>
                        Copy Link 
                        <CopyIcon className="size-4 ml-2" />
                    </Button>
                </div>
                <div className="flex items-center justify-center w-full">
                    <Button  variant="outline" onClick={handleResetCode}>
                        Reset Join Code
                        <RefreshCwIcon className="size-4 ml-2" />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}