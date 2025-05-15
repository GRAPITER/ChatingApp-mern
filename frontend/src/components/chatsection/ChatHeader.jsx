import { XIcon } from "lucide-react";
import { useMessageStore } from "../../stores/messages-store";
import { useAuthStore } from "../../stores/auth-store";

export default function ChatHeader() {
  const { selectedUser, setSelectedUser } = useMessageStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="px-6 py-3 flex items-center justify-between border-b-1 border-base-100">
      <div className="flex items-center gap-2 ">
        <div className="relative">
          <img
            src={selectedUser.image || "avatar.png"}
            className="w-12 h-12 object-cover rounded-full"
          />
          {onlineUsers.includes(selectedUser._id) ? (
            <div className="h-3 w-3 rounded-full absolute bg-green-600 top-0 right-0"></div>
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-col">
          <span className="text-lg">{selectedUser.fullName}</span>
          <span className="font-light text-zinc-400">
            {onlineUsers.includes(selectedUser._id) ? "online" : "offline"}
          </span>
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
