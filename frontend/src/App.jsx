import { Navigate, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import SignupPage from "./pages/signupPage";
import LoginPage from "./pages/loginPage";
import SettingPage from "./pages/settingPage";
import ProfilePage from "./pages/profilePage";
import Navbar from "./components/global/navbar";
import { useAuthStore } from "./stores/auth-store";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
function App() {
  const { userAuth, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !userAuth)
    return (
      <div className="max-w-full h-screen flex justify-center items-center">
        <Loader className="animate-spin size-16" />
      </div>
    );

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={userAuth ? <Home /> : <Navigate to={"/signup"} />}
        />
        <Route
          path="/signup"
          element={!userAuth ? <SignupPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/login"
          element={!userAuth ? <LoginPage /> : <Navigate to={"/"} />}
        />
        <Route path="/setting" element={<SettingPage />} />
        <Route
          path="/profile"
          element={userAuth ? <ProfilePage /> : <Navigate to={"/signup"} />}
        />
      </Routes>

      <Toaster position="top-center" />
    </div>
  );
}

export default App;
