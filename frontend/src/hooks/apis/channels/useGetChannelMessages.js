import { getPaginatedMessages } from "@/api/channels"
import { useAuth } from "@/hooks/context/useAuth"
import { useQuery } from "@tanstack/react-query"

export const useGetChannelMessages = (channelId) => {
    const {auth} = useAuth();
    const {isFetching, isError, error, data} = useQuery({
        queryFn: () => getPaginatedMessages({channelId, limit: 10, offset: 0, token: auth?.token}),
        queryKey: ['getPaginatedMessages', channelId],
    });

    return {
        isFetching,
        isError,
        error,
        messages: data
    }
}