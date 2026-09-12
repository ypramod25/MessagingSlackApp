import { ChannelHeader } from '@/components/molecules/Channel/ChannelHeader';
import { ChatInput } from '@/components/molecules/ChatInput/ChatInput';
import { Message } from '@/components/molecules/Message/Message';
import { useGetChannelById } from '@/hooks/apis/channels/useGetChannelById';
import { useGetChannelMessages } from '@/hooks/apis/channels/useGetChannelMessages';
import { useChannelMessages } from '@/hooks/context/useChannelMessages';
import { useSocket } from '@/hooks/context/useSocket';
import { useQueryClient } from '@tanstack/react-query';
import { Loader2Icon, TriangleAlert } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

export const Channel = () => {

    const { channelId } = useParams();
    const {channelDetails, isFetching, isError} = useGetChannelById(channelId);
    const {setMessageList, messageList} = useChannelMessages();

    const {joinChannel} = useSocket();

    const {messages, isSuccess} = useGetChannelMessages(channelId);

    const messageListContainerRef = useRef(null);

    const queryClient = useQueryClient();

    useEffect(() => {
        if(messageListContainerRef.current) {
            messageListContainerRef.current.scrollTop = messageListContainerRef.current.scrollHeight;
        }
    }, [messageList]);

    useEffect(() => {
        queryClient.invalidateQueries('getPaginatedMessages');
    }, [channelId])

    useEffect(() => {
        if(!isFetching && !isError) {
            joinChannel(channelId);
        }
    }, [isFetching, isError, joinChannel, channelId]);

    useEffect(() => {
        if(isSuccess) {
            console.log('Channel messages fetched');
            setMessageList(messages);
        }
    }, [isSuccess, messages, setMessageList]);

    if(isFetching) {
        return (
            <div
                className='h-full flex-1 flex items-center justify-center'
            >
                <Loader2Icon className='size-5 animate-spin text-muted-foreground' />
            </div>
        );
    }

    if(isError) {
        return (
            <div 
                className='h-full flex flex-col items-center justify-center'
            >
                <TriangleAlert className='size-6 text-muted-foreground' />
                <span className='text-sm text-muted-foreground'>Channel Not Found</span>
            </div>
        )
    }

    return (
        <div className='flex flex-col h-full'>
            <ChannelHeader name={channelDetails?.name}/>
            <div 
                ref={messageListContainerRef}
                className='flex-5 overflow-y-auto p-5 gap-y-2'
            >
                {messageList?.map((message) => {
                    return (
                        <Message
                            key={message._id}
                            body={message.body}
                            authorImage={message.senderId?.avatar}
                            authorName={message.senderId?.username}
                            createdAt={new Date(message.createdAt).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                            image={message.image}
                        />
                    );
                })}
            </div>
            <div className='flex-1'></div>
            <ChatInput />

        </div>
    )

};