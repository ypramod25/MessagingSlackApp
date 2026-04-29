import { StatusCodes } from "http-status-codes";

import userRepository from "../repositories/userRepository.js";
import workspaceRepository from "../repositories/workspaceRepository.js";
import ClientError from "../utils/errors/clientError.js";
import { isUserMemberOfWorkspace } from "./workspaceService.js";

export const isMemberPartOfWorkspaceService = async (workspaceId, memberId) => {
    const workspace = await workspaceRepository.getById(workspaceId);
    if(!workspace) {
        throw new ClientError({
            explanation: "Invalid data send from client",
            message: `Workspace with id: ${workspaceId} not found`,
            statusCode: StatusCodes.NOT_FOUND
        })
    }

    const isUserMember = isUserMemberOfWorkspace(workspace, memberId);
    if(!isUserMember) {
        throw new ClientError({
            explanation: "Unauthorized access to workspace",
            message: `User with id: ${memberId} is not a member of workspace with id: ${workspaceId}`,
            statusCode: StatusCodes.UNAUTHORIZED
        })
    }

    const user = await userRepository.getById(memberId);
    return user;
}