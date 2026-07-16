import { StatusCodes } from 'http-status-codes';
import { v4 as uuidv4 } from 'uuid';

import { addEmailToMailQueue } from '../producers/mailQueueProducers.js';
import channelRepository from '../repositories/channelRepository.js';
import userRepository from '../repositories/userRepository.js';
import workspaceRepository from "../repositories/workspaceRepository.js"
import { workspaceJoinMail } from '../utils/common/mailObject.js';
import ClientError from '../utils/errors/clientError.js';
import ValidationError from '../utils/errors/validationError.js';

const isUserAdminOfWorkspace = (workspace, userId) => {
    return workspace.members.some(member => {
        const id = member.memberId._id || member.memberId;
        return (
            id.toString() === userId.toString() &&
            member.role === "admin"
        );
    });
}

export const isUserMemberOfWorkspace = (workspace, userId) => {
    return workspace.members.some((member) => {
        const id = member.memberId._id || member.memberId;
        return id.toString() === userId.toString();
    });
}

const isChannelAlreadyPartOfWorkspace = (workspace, channelName) => {
    return workspace.channels.some(channel => channel.toString() === channelName);
}

export const createWorkspaceService = async (workspaceData) => {
    try {
        const joinCode = uuidv4().substring(0, 6).toUpperCase();
        const response = await workspaceRepository.create({
            name: workspaceData.name,
            description: workspaceData.description,
            joinCode
        });
        
        await workspaceRepository.addMemberToWorkspace(
            response._id, // workspace id
            workspaceData.owner, // member id
            'admin'
        );

        const updatedWorkspace = await workspaceRepository.addChannelToWorkspace(
            response._id, // workspace id
            'general'
        )

        return updatedWorkspace;
    } catch (error) {
        console.log("Error in createWorkspaceService:", error);
        if(error.name === 'ValidationError') {
            throw new ValidationError({
                error: error.errors
            }, error.message);
        }
        if(error.name === 'MongoServerError' && error.code === 11000) {
            throw new ValidationError({
                error:['A workspace with same details already exists']
            }, 'A workspace with same details already exists');
        }
        throw error;
    }
}

// export const getWorkspacesUserIsMemberOfService = async (userId) => {
//     try {
//         const response = await workspaceRepository.fetchallWorkspaceByMemberId(userId);
//         if(response.length === 0) {
//             throw new ValidationError({
//                 error: ['User is not part of any workspace']
//             }, 'User is not part of any workspace');
//         }
//         return response;
//     } catch (error) {
//         console.log("Error in getWorkspacesUserIsMemberOfService:", error);
//         throw error;
//     }
// }
export const getWorkspacesUserIsMemberOfService = async (userId) => {
    try {
        const response = await workspaceRepository.fetchallWorkspaceByMemberId(userId);

        return response;      // <-- even if it's []
    } catch (error) {
        console.log("Error in getWorkspacesUserIsMemberOfService:", error);
        throw error;
    }
}

export const getWorkspaceByIdService = async (workspaceId, userId) => {
    try {
        const workspace = await workspaceRepository.getWorkspaceDetailsById(workspaceId);
        if(!workspace) {
            throw new ClientError({
                explanation: 'Workspace with the provided id does not exist',
                message: 'Invalid workspace id',
                statusCode: StatusCodes.NOT_FOUND
            })
        }
        const isMember = isUserMemberOfWorkspace(workspace, userId);
        if(!isMember) {
            throw new ClientError({
                explanation: 'User is not member of the workspace',
                message: 'User is not the member of the workspace',
                statusCode: StatusCodes.UNAUTHORIZED
            })
        }
        return workspace;

    } catch (error) {
        console.log("Error in getWorkspaceByIdService:", error);
        throw error;
    }
}

export const deleteWorkspaceService = async (workspaceId, userId) => {
    try {
        const workspace = await workspaceRepository.getById(workspaceId);
        if(!workspace) {
            throw new ClientError({
                explanation: 'Workspace with the provided id does not exist',
                message: 'Invalid workspace id',
                statusCode: StatusCodes.NOT_FOUND
            })
        }
        const isAdmin = isUserAdminOfWorkspace(workspace, userId);
        if(!isAdmin) {
            throw new ClientError({
                explanation: 'User is not admin of the workspace or member of the workspace',
                message: 'Only workspace admins can delete the workspace',
                statusCode: StatusCodes.UNAUTHORIZED
            })
        }
        await channelRepository.deleteMany(workspace.channels);
        const response = await workspaceRepository.deleteById(workspaceId);
        return response;
    } catch (error) {
        console.log("Error in deleteWorkspaceService:", error);
        throw error;
    }
}

export const getWorkspaceByJoinCodeService = async (joinCode, userId) => {
    try {
        const workspace = await workspaceRepository.getWorkspaceByJoinCode(joinCode);
        if(!workspace) {
            throw new ClientError({
                explanation: 'Workspace with the provided join code does not exist',
                message: 'Invalid join code',
                statusCode: StatusCodes.NOT_FOUND
            })
        }
        const isMember = isUserMemberOfWorkspace(workspace, userId);
        if(!isMember) {
            throw new ClientError({
                explanation: 'User is not member of the workspace',
                message: 'User is not the member of the workspace',
                statusCode: StatusCodes.UNAUTHORIZED
            })
        }
        return workspace;
    } catch (error) {
        console.log('Get workspace by join code service error', error);
        throw error;
    }
}

export const updateWorkspaceService = async (workspaceId, userId, workspaceData) => {
    try {
        const workspace = await workspaceRepository.get(workspaceId);
        if(!workspace) {
            throw new ClientError({
                explanation: 'Workspace with the provided id does not exist',
                message: 'Invalid workspace id',
                statusCode: StatusCodes.NOT_FOUND
            })
        }
        const isAdmin = isUserAdminOfWorkspace(workspace, userId);
        if(!isAdmin) {
            throw new ClientError({
                explanation: 'User is not admin of the workspace',
                message: 'Only workspace admins can update the workspace',
                statusCode: StatusCodes.UNAUTHORIZED
            })
        }
        const updatedWorkspace = await workspaceRepository.updateById(workspaceId, workspaceData);
        return updatedWorkspace;
    } catch (error) {
        console.log('Update workspace service error', error);
        throw error;
    }
}

export const addMemberToWorkspaceService = async (workspaceId, userId, memberId, role) => {
    try {
        const workspace = await workspaceRepository.getById(workspaceId);
        if(!workspace) {
            throw new ClientError({
                explanation: 'Workspace with the provided id does not exist',
                message: 'Invalid workspace id',
                statusCode: StatusCodes.NOT_FOUND
            })
        }
        const isAdmin = isUserAdminOfWorkspace(workspace, userId);
        if(!isAdmin) {
            throw new ClientError({
                explanation: 'User is not admin of the workspace',
                message: 'Only workspace admins can add members to the workspace',
                statusCode: StatusCodes.UNAUTHORIZED
            })
        }
        const isValidUser = await userRepository.getById(memberId);
        if(!isValidUser) {
            throw new ClientError({
                explanation: 'User with the provided member id does not exist',
                message: 'Invalid member id',
                statusCode: StatusCodes.NOT_FOUND
            })
        }
        const isMember = isUserMemberOfWorkspace(workspace, memberId);
        if(isMember) {
            throw new ClientError({
                explanation: 'User is already member of the workspace',
                message: 'User is already member of the workspace',
                statusCode: StatusCodes.BAD_REQUEST
            })
        }
        const updatedWorkspace = await workspaceRepository.addMemberToWorkspace(workspaceId, memberId, role);
        addEmailToMailQueue({
            ...workspaceJoinMail(workspace.name),
            to: isValidUser.email
        });
        
        return updatedWorkspace;

    } catch (error) {
        console.log('Add member to workspace service error', error);
        throw error;
    }
}


export const addChannelToWorkspaceService = async (workspaceId, userId, channelName) => {
    try {
        const workspace = await workspaceRepository.getById(workspaceId);
        if(!workspace) {
            throw new ClientError({
                explanation: 'Workspace with the provided id does not exist',
                message: 'Invalid workspace id',
                statusCode: StatusCodes.NOT_FOUND
            })
        }
        const isAdmin = isUserAdminOfWorkspace(workspace, userId);
        if(!isAdmin) {
            throw new ClientError({
                explanation: 'User is not admin of the workspace',
                message: 'Only workspace admins can add channels to the workspace',
                statusCode: StatusCodes.UNAUTHORIZED
            })
        }
        const isChannelPartOfWorkspace = isChannelAlreadyPartOfWorkspace(workspace, channelName);
        if(isChannelPartOfWorkspace) {
            throw new ClientError({
                explanation: 'Channel is already part of the workspace',
                message: 'Channel is already part of the workspace',
                statusCode: StatusCodes.BAD_REQUEST
            })
        }
        const updatedWorkspace = await workspaceRepository.addChannelToWorkspace(workspaceId, channelName);
        return updatedWorkspace;
    } catch (error) {
        console.log('Add channel to workspace service error', error);
        throw error;
    }
}
