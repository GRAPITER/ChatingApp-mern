import { useEffect } from "react";
import { useMessageStore } from "../stores/messages-store";
import { Loader } from "lucide-react";
import { useAuthStore } from "../stores/auth-store";

export default function Sidebar() {
  const { users, selectedUser, setSelectedUser, isUserFetching, userFetch } =
    useMessageStore();
  const { onlineUsers } = useAuthStore();
  useEffect(() => {
    userFetch();
  }, [userFetch]);

  if (isUserFetching)
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Loader className="animate-spin size-11 " />
      </div>
    );

  return (
    <div className=" w-full max-w-xs h-screen overflow-y-auto ">
      <div className="flex flex-col gap-2">
        {users.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`flex items-center gap-4 p-3 rounded-md text-left transition hover:bg-base-100  ${
              selectedUser?._id === user._id
                ? "bg-base-300 ring-1 ring-base-300"
                : ""
            }`}
          >
            <div className="relative">
              <img
                src={user.image || "avatar.png"}
                className="w-14 h-14 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) ? (
                <div className="h-3 w-3 rounded-full absolute bg-green-600 top-0 right-1"></div>
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-col ">
              <span className="hidden md:block text-lg">{user.fullName}</span>
              <span className="text-sm hidden md:block text-zinc-400 font-medium mt-1">
                {onlineUsers.includes(user._id) ? "online" : "offline"}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
