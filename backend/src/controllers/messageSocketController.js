import {createMessageService} from "../services/messageService.js";
import { NEW_MESSAGE_EVENT, NEW_MESSAGE_RECEIVED_EVENT } from "../utils/common/eventConstants.js";

export default function messageHandler(io, socket) {
    socket.on(NEW_MESSAGE_EVENT, async function createMessageHandler(data, cb) {
        const messageResponse = await createMessageService(data);
        const {channelId} = data;
        // socket.broadcast.emit(NEW_MESSAGE_RECEIVED_EVENT, messageResponse);
        io.to(channelId).emit(NEW_MESSAGE_RECEIVED_EVENT, messageResponse);// send message to all users in the channel
        cb({
            success: true,
            message: "Message created successfully",
            data: messageResponse
        });
    });
}  

/*
{
    "body":"random1",
    "channelId":"69855d228004ae1a0804c99b",
    "senderId":"69650b78b1d2ac01613c6589",
    "workspaceId":"6988152b6056881a52498429"
}
*/