import { React, useEffect, useRef } from 'react';
import { useChatStore } from '../store/useChatStore';
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from './skeletons/MessageSkeleton';
import { useAuthStore } from '../store/useAuthStore';
import { formatMessageTime } from '../lib/utils';

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessages,
    unsubscribeFromMessages } = useChatStore();
  const { authUser } = useAuthStore();

  //for sliding down to the latest msg.
  const messageEndRef = useRef(null);

  //put above since useeffect should not run on any control statements.
  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => {
      unsubscribeFromMessages();
    }

  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages)
      messageEndRef.current.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  //instead of loading... we want a loading skeleton.
  if (isMessagesLoading) {
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader />
      <MessageSkeleton />
      <MessageInput />
    </div>
  }




  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      {/* <p>msgs</p> dummy */}
      {/* using daisyui components chat-start and chat-end for me and others separate side chat */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message._id}
            //chat logic here
            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
            ref={messageEndRef}  //scrolling msg
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img src={message.senderId === authUser._id ? authUser.profilePic || "/avatar.png" : selectedUser.profilePic || "/avatar.png"}
                  alt="profile pic"
                />
              </div>
            </div>

            {/* daisyui chat header for time and msg */}
            <div className="chat-header mb-1 ">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>


      <MessageInput />
    </div>
  )
}

export default ChatContainer
