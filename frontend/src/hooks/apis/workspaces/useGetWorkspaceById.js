import { fetchWorkspaceDetailsRequest } from "@/api/workspaces";
import { useAuth } from "@/hooks/context/useAuth"
import { useQuery } from "@tanstack/react-query";

export const useGetWorkspaceById = (id) => {
    const {auth} = useAuth();

    const {isFetching, isSuccess, error, data: workspace} = useQuery({
        queryFn:() => fetchWorkspaceDetailsRequest({workspaceId:id, token: auth?.token}),
        queryKey: [`fetchWorkspaceById-${id}`],//different query key helps us to cache different workspace details
        staleTime: 10000
    });

    return ({
        isFetching,
        isSuccess,
        error,
        workspace 
    });
};