import { useEffect } from "react";
import { useMessageStore } from "../stores/messages-store";
import { Loader } from "lucide-react";

export default function Sidebar() {
  const { users, selectedUser, setSelectedUser, isUserFetching, userFetch } =
    useMessageStore();

  const onlineUser = [];

  useEffect(() => {
    userFetch();
  }, [userFetch]);

  if (isUserFetching) return <Loader className="animate-spin size-6" />;

  return (
    <div>
      <div>
        {users.data.map((user) => (
          <button key={user._id} onClick={() => setSelectedUser(user)}>
            <div>
              <h1>{}</h1>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
