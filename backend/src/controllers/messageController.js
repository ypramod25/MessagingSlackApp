import { StatusCodes } from "http-status-codes";

import { getMessagesService } from "../services/messageService.js";
import { customErrorResponse, internalErrorResponse, successResponse } from "../utils/common/responseObjects.js";
import { AWS_BUCKET_NAME } from "../config/serverConfig.js";
import {s3} from "../config/awsConfig.js"

export const getMessagesController = async (req, res) => {
    try {
        const message = await getMessagesService(
            {
                channelId: req.params.channelId,
            },
            req.query.page || 1,
            req.query.limit || 20,
            req.user
        );
        return res
        .status(StatusCodes.OK)
        .json(successResponse(message, "Messages fetched successfully"));
    } catch (error) {
        if(error.statusCode) {
            return res.status(error.statusCode).json(customErrorResponse(error));
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalErrorResponse(error));
    }
}

export const getPresignedUrlFromAWS = async (req, res) => {
    try {
        const url = await s3.getSignedUrlPromise('putObject', {
            Bucket: AWS_BUCKET_NAME,
            Key: `${Date.now()}`,
            Expires: 60 // 1min
        })
        return res
          .status(StatusCodes.OK)
          .json(successResponse(url, 'Presigned URL generated successfully'));
    } catch(error) {
        console.log('Error in getting presigned url from aws', error);
        if(error.statusCode) {
            return res.status(error.statusCode).json(customErrorResponse(error));
        }
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(internalErrorResponse);
    }
}