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