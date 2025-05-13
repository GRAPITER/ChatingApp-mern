import React, { useEffect } from "react";
import { useMessageStore } from "../../stores/messages-store";
import { Loader } from "lucide-react";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";

export default function UserChat() {
  const { messages, messageFetch, isMessageFetching, selectedUser } =
    useMessageStore();

  useEffect(() => {
    messageFetch(selectedUser._id);
  }, [selectedUser._id, messageFetch]);

  if (isMessageFetching)
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
        <h1>asas</h1>
      </div>
      <ChatInput />
    </div>
  );
}
