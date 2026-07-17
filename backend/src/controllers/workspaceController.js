import { StatusCodes } from "http-status-codes";

import { addChannelToWorkspaceService, addMemberToWorkspaceService, createWorkspaceService, deleteWorkspaceService, getWorkspaceByIdService, getWorkspaceByJoinCodeService, getWorkspacesUserIsMemberOfService, resetWorkspaceJoinCodeService, updateWorkspaceService } from "../services/workspaceService.js"
import { customErrorResponse, internalErrorResponse, successResponse } from "../utils/common/responseObjects.js";

export const createWorkspaceController = async (req, res) => {
    try {
        const response = await createWorkspaceService({
            ...req.body,
            owner: req.user
        })
        return res.status(StatusCodes.CREATED).json(successResponse(response, "Workspace created successfully"));
    } catch (error) {
        console.log(error);

        if(error.statusCode) {
            return res.status(error.statusCode).json(customErrorResponse(error));
        }

        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(internalErrorResponse(error));
    }
}

export const getWorkspacesUserIsMemberOfController = async (req, res) => {
    try {
        const response = await getWorkspacesUserIsMemberOfService(req.user);
        return res
            .status(StatusCodes.OK)
            .json(successResponse(response, "Workspaces fetched successfully"));
    } catch (error) {
        console.log(error);
        if(error.statusCode) {
            return res.status(error.statusCode).json(customErrorResponse(error));
        }
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(internalErrorResponse(error));
    }
}

export const deleteWorkspaceController = async (req, res) => {
    try {
        const response = await deleteWorkspaceService(
            req.params.workspaceId,
            req.user
        );
        return res
            .status(StatusCodes.OK)
            .json(successResponse(response, "Workspace deleted successfully"));
    } catch (error) {
        console.log(error);
        if(error.statusCode) {
            return res.status(error.statusCode).json(customErrorResponse(error));
        }
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(internalErrorResponse(error));
    }
}

export const getWorkspaceByIdController = async (req, res) => {
    try {
        const response = await getWorkspaceByIdService(req.params.workspaceId, req.user);
        return res
            .status(StatusCodes.OK)
            .json(successResponse(response, "Workspace fetched successfully"));
    } catch (error) {
        console.log('Get workspace controller error:', error);
        if(error.statusCode) {
            return res.status(error.statusCode).json(customErrorResponse(error));
        }
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(internalErrorResponse(error));
    }
}

export const getWorkspaceByJoinCodeController = async (req, res) => {
    try {
        const response = await getWorkspaceByJoinCodeService(req.params.joinCode, req.user);
        return res
            .status(StatusCodes.OK)
            .json(successResponse(response, "Workspace fetched successfully"));
    } catch (error) {
        console.log('Get workspace by join code controller error:', error);
        if(error.statusCode) {
            return res.status(error.statusCode).json(customErrorResponse(error));
        }
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(internalErrorResponse(error));
    }
}

export const updateWorkspaceController = async (req, res) => {
    try {
        const response = await updateWorkspaceService(req.params.workspaceId, req.user, req.body);
        return res
            .status(StatusCodes.OK)
            .json(successResponse(response, "Workspace data updated successfully"));
    } catch (error) {
        console.log('Update workspace  controller error:', error);
        if(error.statusCode) {
            return res.status(error.statusCode).json(customErrorResponse(error));
        }
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(internalErrorResponse(error));
    }
}

export const addMemberToWorkspaceController = async (req, res) => {
    try {
        const response = await addMemberToWorkspaceService(req.params.workspaceId,req.user, req.body.memberId, req.body.role || 'member');
        return res
            .status(StatusCodes.OK)
            .json(successResponse(response, "Member added to workspace successfully"));
    } catch (error) {
        console.log('Add member to workspace controller error:', error);
        if(error.statusCode) {
            return res.status(error.statusCode).json(customErrorResponse(error));
        }
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(internalErrorResponse(error));
    }
}

export const addChannelToWorkspaceController = async (req, res) => {
    try {
        const response = await addChannelToWorkspaceService(req.params.workspaceId, req.user, req.body.name);
        return res
            .status(StatusCodes.OK)
            .json(successResponse(response, "Channel added to workspace successfully"));
    } catch (error) {
        console.log('Add channel to workspace controller error:', error);
        if(error.statusCode) {
            return res.status(error.statusCode).json(customErrorResponse(error));
        }
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(internalErrorResponse(error));
    }
}

export const resetJoinCodeController = async (req, res) => {
    try {
        const response = await resetWorkspaceJoinCodeService(req.params.workspaceId, req.user);
        return res
            .status(StatusCodes.OK)
            .json(successResponse(response, "Join code reset successfully"));
    } catch (error) {
        console.log('reset join code controller error', error);
        if(error.statusCode) {
            return res.status(error.statusCode).json(customErrorResponse(error));
        }
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(internalErrorResponse(error));
    }
}