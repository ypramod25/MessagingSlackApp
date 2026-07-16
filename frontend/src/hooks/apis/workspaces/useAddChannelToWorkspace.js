import { useMutation } from "@tanstack/react-query";
import {useAuth} from "@/hooks/context/useAuth";
import { addChannelToWorkspaceRequest } from "@/api/workspaces";

export const useAddChannelToWorkspace = () => {
    const {auth} = useAuth();

    const {isPending, isSuccess, error, mutateAsync:addChannelToWorkspaceMutation} = useMutation({
        mutationFn:({workspaceId, name}) => addChannelToWorkspaceRequest({workspaceId, name, token: auth?.token}),
        onSuccess: (data) => {
            console.log("Successfully added channel to workspace", data);
        },
        onError: (error) => {
            console.error('Failed to add channel to workspace', error);
        }
    });

    return {
        addChannelToWorkspaceMutation,
        isPending,
        isSuccess,
        error
    }
}