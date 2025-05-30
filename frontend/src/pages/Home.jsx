import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/chatsection/NoChatSelected";
import UserChat from "../components/chatsection/UserChat";
import { useMessageStore } from "../stores/messages-store";

export default function Home() {
  const { selectedUser } = useMessageStore();
  return (
    <div className="min-h-screen max-w-5xl mx-auto grid grid-cols-12 grid-rows-12  rounded-4xl bg-base-200 shadow-2xl my-10">
      <div className="col-start-1 col-end-4 row-span-12 border-r-[0.1px] border-base-100 bg-base-200">
        <Sidebar />
      </div>
      <div className="col-start-4 col-end-13 row-span-12  bg-base-200 h-screen w-full">
        {selectedUser ? <UserChat /> : <NoChatSelected />}
      </div>
    </div>
  );
}
