import { Cake, LogOut, Settings, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../stores/auth-store";

export default function Navbar() {
  const { userAuth, logout } = useAuthStore();
  return (
    <div className="h-16 flex justify-between max-w-7xl m-auto bg-base-100">
      <div className="flex justify-center items-center gap-3">
        <Link to="/">
          <Cake className="size-10 text-primary" />
        </Link>
        <div>
          <h1 className="font-bold text-2xl ">Chatt</h1>
        </div>
      </div>
      <div className="flex justify-center items-center gap-3">
        <Link
          to={"/setting"}
          className="flex justify-center items-center gap-2 btn h-8 rounded-2xl"
        >
          <Settings className="size-5" /> setting
        </Link>
        {userAuth && (
          <>
            {" "}
            <Link
              to={"profile"}
              className="flex justify-center items-center gap-2 btn h-8 rounded-2xl"
            >
              <UserRound className="size-5" />
              profile
            </Link>
            <Link
              to={"/login"}
              onClick={logout}
              className="flex justify-center items-center gap-2 btn h-8 rounded-2xl"
            >
              <LogOut className="size-5" />
              logout
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
