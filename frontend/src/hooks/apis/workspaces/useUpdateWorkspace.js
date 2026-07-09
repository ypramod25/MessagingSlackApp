import { updateWorkspaceRequest } from "@/api/workspaces";
import { useAuth } from "@/hooks/context/useAuth";

export const useUpdateWorkspace = (workspaceId) => {
    const {auth} = useAuth();

    const {isFetching, isSuccess, error, mutateAsync: updatedWorkspace} = useMutation({
        mutationFn:(name) => updateWorkspaceRequest({token: auth?.token, workspaceId, name}),
        queryKey: ['updateWorkspace'],
        onSuccess: (data) => {
            console.log("Successfully updated workspace", data);
        },
        onError: (error) => {
            console.error('Failed to update workspace', error);
        }
    });

    return ({
        isFetching, 
        isSuccess, 
        error, 
        updatedWorkspace
    })
}