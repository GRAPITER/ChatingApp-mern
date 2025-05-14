import React, { useEffect } from "react";
import { useMessageStore } from "../../stores/messages-store";
import { Loader } from "lucide-react";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import { useAuthStore } from "../../stores/auth-store";
import Time from "react-time-format";
export default function UserChat() {
  const { messages, messageFetch, isMessageFetching, selectedUser } =
    useMessageStore();

  const { userAuth } = useAuthStore();

  useEffect(() => {
    messageFetch(selectedUser._id);
  }, [selectedUser._id, messageFetch]);

  if (isMessageFetching && !userAuth && !selectedUser)
    return (
      <div className="flex h-screen justify-center items-center">
        {" "}
        <Loader className="size-20 animate-spin" />
      </div>
    );

  return (
    <div className="flex flex-col overflow-auto h-full">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((mess) => {
          return (
            <div
              className={`chat ${
                mess.senderId === userAuth.data._id ? "chat-end" : "chat-start"
              }`}
              key={mess._id}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src={
                      mess.senderId === userAuth.data._id
                        ? userAuth.data.image || "/avatar.png"
                        : selectedUser.image || "/avatar.png"
                    }
                  />
                </div>
              </div>
              <div className="chat-header">
                {mess.senderId === userAuth.data._id
                  ? userAuth.data.fullName
                  : selectedUser.fullName}
                <time className="text-xs opacity-50">
                  <Time value={mess.createdAt} format={"HH:mm:ss"} />
                </time>
              </div>
              <div className="chat-bubble flex bg-transparent">
                {mess.image && (
                  <img
                    src={mess.image}
                    alt="image"
                    className="sm:max-w-[200px] rounded-md mb-2"
                  />
                )}
              </div>
              <div className="chat-bubble">{mess.text}</div>
              <div className="chat-footer opacity-50">Delivered</div>
            </div>
          );
        })}
      </div>
      <ChatInput />
    </div>
  );
}
