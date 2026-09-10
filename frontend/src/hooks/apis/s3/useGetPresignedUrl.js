import { getPresignedUrlFromAWS } from "@/api/s3";
import { useAuth } from "@/hooks/context/useAuth"
import { useQuery } from "@tanstack/react-query";

export const useGetPresignedUrl = () => {
    const {auth} = useAuth();

    const {isFetching, isError, error, data} = useQuery({
        queryFn: getPresignedUrlFromAWS({token: auth?.token}),
        queryKey:['getPresignedUrl'],
    });

    return{
        isFetching,
        isError,
        error,
        data: url
    }
}