import { getPresignedUrlFromAWS, uploadImageToAWSpresignedUrl } from '@/api/s3';
import { Editor } from '@/components/atoms/Editor/Editor';
import { useAuth } from '@/hooks/context/useAuth';
import { useCurrentWorkspace } from '@/hooks/context/useCurrentWorkspace';
import { useSocket } from '@/hooks/context/useSocket';
import { useQueryClient } from '@tanstack/react-query';

export const ChatInput = () => {

    const {socket, currentChannel} = useSocket();
    const {auth} = useAuth();
    const {currentWorkspace} = useCurrentWorkspace();
    const queryClient = useQueryClient();

    async function handleSubmit ({body, image}) {

        let fileUrl = null;
        if(image) {
            const preSignedUrl = await queryClient.fetchQuery({
                queryKey:['getPresignedUrl'],
                queryFn: () => getPresignedUrlFromAWS({token: auth?.token})
            });

            console.log("PRESIGNED URL FROM API:", preSignedUrl);

            const responseAWS = await uploadImageToAWSpresignedUrl({
                url: preSignedUrl, 
                file: image
            });

            fileUrl = preSignedUrl.split('?')[0];
        }

        console.log(body);
        socket?.emit('new message', {
            channelId: currentChannel,
            body,
            image: fileUrl,
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