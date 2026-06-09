import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    body: { // text content of the message
        type: String,
        required: [true, "Message body is required"],
    },
    image: { // optional image URL for the message
        type: String,
    },
    channelId: { // reference to the channel where the message was sent
        type: mongoose.Schema.Types.ObjectId,
        ref: "Channel",
        required: [true, "Channel ID is required"],
    },
    senderId: { // reference to the user who sent the message
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Sender ID is required"],
    },
    workspaceId: { // reference to the workspace where the message was sent
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workspace",
        required: [true, "Workspace ID is required"],
    }
}, { timestamps: true });

const Message = mongoose.model("Message", messageSchema);
export default Message;