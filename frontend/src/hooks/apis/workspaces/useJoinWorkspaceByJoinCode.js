import { useMutation } from "@tanstack/react-query";
import { joinWorkspaceByJoinCodeRequest } from "@/api/workspaces";
import { useAuth } from "@/hooks/context/useAuth";

export const useJoinWorkspaceByJoinCode = () => {

    const { auth } = useAuth();

    const {
        mutate: joinWorkspaceByJoinCode,
        isPending,
        isSuccess,
        isError,
        error,
        data
    } = useMutation({
        mutationFn: ({ joinCode }) =>
            joinWorkspaceByJoinCodeRequest({
                joinCode,
                token: auth?.token
            })
    });

    return {
        joinWorkspaceByJoinCode,
        isPending,
        isSuccess,
        isError,
        error,
        data
    };
};