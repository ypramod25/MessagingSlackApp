import { StatusCodes } from "http-status-codes";

import channelRepository from "../repositories/channelRepository.js";
import messageRepository from "../repositories/messageRepository.js";
import ClientError from "../utils/errors/clientError.js";
import { isUserMemberOfWorkspace } from "./workspaceService.js";

export const getChannelByIdService = async (channelId, userId) => {
    try {
        const channel = await channelRepository.getChannelWithWorkspaceDetails(channelId);        
        if(!channel || !channel.workspaceId) {
            throw new ClientError({
                message:'Channel not found',
                explanation: 'Invaid channel data sent from client',
                statusCode: StatusCodes.NOT_FOUND
            });
        }
        const workspace = channel.workspaceId;
        if(!isUserMemberOfWorkspace(workspace, userId)) {
            throw new ClientError({
                message:'Unauthorized',
                explanation: 'User is not a member of the workspace containing this channel',
                statusCode: StatusCodes.UNAUTHORIZED
            });
        }

        //return messages in the channel as well
        const messages = await messageRepository.getPaginatedMessages({channelId}, 1, 20);
        channel.messages = messages;
        return channel;
         
    } catch (error) {
        console.error('Error in getChannelById:', error);
        throw error;
    }
} 