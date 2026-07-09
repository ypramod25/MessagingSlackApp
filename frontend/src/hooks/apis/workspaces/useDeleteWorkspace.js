import { deleteWorkspaceRequest } from "@/api/workspaces";
import { useAuth } from "@/hooks/context/useAuth";

export const useDeleteWorkspace = (workspaceId) => {
    const {auth} = useAuth();

    const {isFetching, isSuccess, error, mutateAsync: deleteWorkspace} = useMutation({
        mutationFn:() => deleteWorkspaceRequest({token: auth?.token, workspaceId}),
        onSuccess: (data) => {
            console.log("Successfully deleted workspace", data);
        },
        onError: (error) => {
            console.error('Failed to delete workspace', error);
        },
        queryKey: ['deleteWorkspace']
    }); 

    return ({
        isFetching, 
        isSuccess, 
        error, 
        deleteWorkspace
    })
}