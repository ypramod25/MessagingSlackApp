import messageRepository from "../repositories/messageRepository";

export const getMessagesService = async (messageParams, page, limit) => {
    try {
        const messages = await messageRepository.getPaginatedMessages(messageParams, page, limit);  
        return messages;
    } catch (error) {
        console.error('Error in getMessagesService:', error);
        throw error;
    }
}