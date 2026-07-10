import { deleteWorkspaceRequest } from "@/api/workspaces";
import { useAuth } from "@/hooks/context/useAuth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteWorkspace = (workspaceId) => {

    const {auth} = useAuth();

    const {isFetching, isSuccess, error, mutateAsync: deleteWorkspaceMutation} = useMutation({
        mutationFn:() => deleteWorkspaceRequest({token: auth?.token, workspaceId}),
        onSuccess: (data) => {
            console.log("Successfully deleted workspace", data);
            toast.success("Workspace deleted successfully");
        },
        onError: (error) => {
            console.error('Failed to delete workspace', error);
            toast.error("Failed to delete workspace");
        },
        queryKey: ['deleteWorkspace']
    }); 

    return ({
        isFetching, 
        isSuccess, 
        error, 
        deleteWorkspaceMutation
    })
}