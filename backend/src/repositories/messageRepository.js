import Message from "../schema/message.js";
import crudRepository from "./crudRepository.js";

const messageRepository = {
    ...crudRepository(Message),
    getPaginatedMessages: async (messageParams, page, limit) => {
        const messages = await Message.find(messageParams)
            .sort({ createdAt: 1 })
            .skip((page - 1) * limit)//skips the docs of previous pages
            .limit(limit)//restricts the number of doc returned
            .populate('senderId', 'username email avatar')
        return messages;
    }
}

export default messageRepository;