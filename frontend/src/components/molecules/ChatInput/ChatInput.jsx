import { Editor } from '@/components/atoms/Editor/Editor';
import { useAuth } from '@/hooks/context/useAuth';
import { useCurrentWorkspace } from '@/hooks/context/useCurrentWorkspace';
import { useSocket } from '@/hooks/context/useSocket';

export const ChatInput = () => {

    const {socket, currentChannel} = useSocket();
    const {auth} = useAuth();
    const {currentWorkspace} = useCurrentWorkspace();

    async function handleSubmit ({body}) {
        console.log(body);
        socket?.emit('new message', {
            channelId: currentChannel,
            body,
            senderId: auth?.user?._id,
            workspaceId: currentWorkspace
        }, (data) => {
            console.log('Message sent', data)
        });
    }

    return (
        <div
            className="px-5 w-full"
        >
            <Editor 
                placeholder="Type a message..."
                onSubmit={handleSubmit}
                onCancel={() => {}}
                disabled={false}
                defaultValue=""

            />
        </div>
    );
}; 