import { XIcon } from "lucide-react";
import { useMessageStore } from "../../stores/messages-store";

export default function ChatHeader() {
  const { selectedUser, setSelectedUser } = useMessageStore();
  console.log(selectedUser);
  return (
    <div className="px-6 py-3 flex items-center justify-between border-b-1 border-base-100">
      <div className="flex items-center gap-3">
        <img
          src={selectedUser.image || "avatar.png"}
          className="w-10 h-10 object-cover rounded-full"
        />
        <div className="flex flex-col">
          <span className="text-lg">{selectedUser.fullName}</span>
          <span className="font-light text-zinc-400">offline</span>
        </div>
      </div>
      <div>
        <button onClick={() => setSelectedUser(null)}>
          <XIcon />
        </button>
      </div>
    </div>
  );
}
