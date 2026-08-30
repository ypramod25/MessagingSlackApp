import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useJoinWorkspaceByJoinCode } from "@/hooks/apis/workspaces/useJoinWorkspaceByJoinCode";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/hooks/context/useAuth";

export const JoinWorkspaceModal = ({ open, setOpen }) => {

    const [joinCode, setJoinCode] = useState("");
    const {auth} = useAuth();

    const { joinWorkspaceByJoinCode, isPending } =
        useJoinWorkspaceByJoinCode();

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const handleJoinWorkspace = () => {

        if (!joinCode.trim()) return;

        console.log("========== JOIN WORKSPACE ==========");
        console.log("JOIN CODE:", joinCode);

        joinWorkspaceByJoinCode(
            {
                joinCode: joinCode.trim()
            },
            {
            onSuccess: (data) => {
                console.log("JOIN SUCCESS:", data);
                console.log("TOKEN BEFORE NAVIGATION:", auth?.token);

                setJoinCode("");
                setOpen(false);

                queryClient.invalidateQueries({
                    queryKey: ["fetchWorkspace"]
                });

                navigate(`/workspaces/${data._id}`);
            },

                onError: (error) => {
                    console.log("JOIN ERROR:", error);
                }
            }
        );
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Join a workspace</DialogTitle>

                    <DialogDescription>
                        Enter the workspace join code to join.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-4">

                    <Input
                        placeholder="Enter join code"
                        value={joinCode}
                        onChange={(e) => setJoinCode(e.target.value)}
                    />

                    <Button
                        onClick={handleJoinWorkspace}
                        disabled={isPending || !joinCode.trim()}
                    >
                        {isPending
                            ? "Joining..."
                            : "Join Workspace"
                        }
                    </Button>

                </div>
            </DialogContent>
        </Dialog>
    );
};