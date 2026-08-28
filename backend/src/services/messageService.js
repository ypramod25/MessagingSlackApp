import { StatusCodes } from "http-status-codes";

import channelRepository from "../repositories/channelRepository.js";
import messageRepository from "../repositories/messageRepository.js";
import ClientError from "../utils/errors/clientError.js";
import { isUserMemberOfWorkspace } from "./workspaceService.js";

export const getMessagesService = async (messageParams, page, limit, user) => {
    try {
        const channelDetails = await channelRepository.getChannelWithWorkspaceDetails(messageParams.channelId);

        const workspace = channelDetails.workspaceId;
        const isMember = isUserMemberOfWorkspace(workspace, user);
        if(!isMember) {
            throw new ClientError({
                message: 'Unauthorized',
                explanation: 'User is not a member of the workspace containing this channel',
                statusCode: StatusCodes.UNAUTHORIZED
            });
        }

        const messages = await messageRepository.getPaginatedMessages(messageParams, page, limit);  
        return messages;
    } catch (error) {
        console.error('Error in getMessagesService:', error);
        throw error;
    }
}

export const createMessageService = async (message) => {
    const newMessage = await messageRepository.create(message);
    return newMessage;
}