import Channel from "../schema/channel.js";
import crudRepository from "./crudRepository.js";

const channelRepository = {
    ...crudRepository(Channel),
    getChannelWithWorkspaceDetails: async (channelId) => {
        const channel = await Channel.findById(channelId).populate('workspaceId').lean(); // lean() returns a plain JS object instead of a Mongoose document, which is more efficient for read-only operations
        return channel;
    }
};

export default channelRepository;