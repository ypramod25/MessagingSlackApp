export const getMessagesController = async (req, res) => {
    try {
        const message = await getMessagesService(
            {
                channelId: req.params.channelId,
            },
            req.query.page || 1,
            req.query.limit || 20
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