import { MessageSquare } from "lucide-react";
export default function NoChatSelected() {
  return (
    <div className="h-full flex justify-center items-center flex-col  space-y-6">
      <div className="bg-primary/20 p-4 rounded-2xl animate-bounce hover:bg-primary/40 duration-300 transition-colors">
        <MessageSquare className="text-primary" />
      </div>
      <h1 className="font-bold text-xl ">Welcome to the Chatt</h1>
      <h1 className="font-bold  ">
        select a conversation from sidebar to start chatting
      </h1>
    </div>
  );
}
