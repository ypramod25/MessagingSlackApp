import axios from "@/config/axiosConfig";

export const getChannelById = async ({channelId, token}) => {
    try {
        const response = await axios.get(`/channels/${channelId}`, {
            headers: {
                'x-access-token': token
            }
        });
        console.log("response in get channel by Id : ", response);
        return response?.data?.data;
    } catch (error) {
        console.log('Error is geting channel by Id request', error); 
        throw error;
    }
}

export const getPaginatedMessages = async ({channelId, limit, offset, token}) => {
    try {
        const response = await axios.get(`/messages/${channelId}`, {
            params: {
                limit: limit || 20,
                offset: offset || 0
            },
            headers: {
                'x-access-token': token
            }
        });
        return response?.data?.data;
    } catch (error) {
        console.log('Error in getting paginated messages ', error);
        throw error;
    }
}