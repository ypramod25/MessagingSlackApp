import { getChannelById } from "@/api/channels"
import { useAuth } from "@/hooks/context/useAuth"
import { useQuery } from "@tanstack/react-query";

export const useGetChannelById = (channelId) => {
    const {auth} = useAuth();
    const {isFetching, isError, data: channelDetails, error} = useQuery({
        queryFn: () => getChannelById({channelId, token : auth?.token}),
        queryKey: [`get-channel-${channelId}`],
        staleTime: 10000
    });

    return {
        isFetching,
        isError,
        channelDetails,
        error
    };
};