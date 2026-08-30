import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useJoinWorkspaceByJoinCode } from "@/hooks/apis/workspaces/useJoinWorkspaceByJoinCode";

export const JoinWorkspace = () => {

    const [joinCode, setJoinCode] = useState("");

    const navigate = useNavigate();

    const {
        joinWorkspaceByJoinCode,
        isPending,
        isError,
        error
    } = useJoinWorkspaceByJoinCode();

    const handleJoinWorkspace = () => {
        joinWorkspaceByJoinCode(
            { joinCode },
            {
                onSuccess: (workspace) => {
                    console.log("Joined workspace:", workspace);

                    navigate(`/workspace/${workspace._id}`);
                }
            }
        );
    };

    return (
        <div className="h-full flex items-center justify-center">

            <div className="w-96 space-y-4">

                <h1 className="text-2xl font-bold">
                    Join Workspace
                </h1>

                <input
                    type="text"
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value)}
                    placeholder="Enter workspace join code"
                    className="w-full border p-2 rounded"
                />

                {isError && (
                    <p className="text-red-500">
                        {error?.message || "Unable to join workspace"}
                    </p>
                )}

                <button
                    onClick={handleJoinWorkspace}
                    disabled={!joinCode || isPending}
                    className="w-full border p-2 rounded"
                >
                    {isPending ? "Joining..." : "Join Workspace"}
                </button>

            </div>

        </div>
    );
};