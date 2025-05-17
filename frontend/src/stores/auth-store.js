import { create } from "zustand";
import { axiosInstanse } from "../lib/axios";
import toast from "react-hot-toast";
import io from "socket.io-client";
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";
export const useAuthStore = create((set, get) => ({
  userAuth: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLogingIn: false,
  isUploadingProfile: false,
  onlineUsers: [],
  socket: null,
  checkAuth: async () => {
    try {
      const res = await axiosInstanse.get("/auth/checkauth");
      set({ userAuth: res.data });
      console.log("UserAuth", get().userAuth.data);
      get().connectSocket();
    } catch (error) {
      console.log("there is an error on checking auth", error);
      set({ userAuth: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signUp: async (data) => {
    try {
      set({ isSigningUp: true });
      const res = await axiosInstanse.post("/auth/signup", data);
      set({ userAuth: res.data });
      get().connectSocket();
      toast.success("user signup successfully");
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    try {
      set({ isLogingIn: true });
      const res = await axiosInstanse.post("/auth/login", data);
      set({ userAuth: res.data });
      get().connectSocket();
      toast.success("successfully looged in");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isLogingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstanse.post("/auth/logout");
      set({ userAuth: null });
      get().disconnectSocket();
      toast.success("Logout suucessfully");
    } catch (error) {
      console.log(error);
    }
  },
  uploadingFile: async (data) => {
    set({ isUploadingProfile: true });
    try {
      const res = await axiosInstanse.put("/auth/updateProfile", data);
      set({ userAuth: res.data });
      toast.success("profile updated");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUploadingProfile: false });
    }
  },

  connectSocket: () => {
    const { userAuth } = get();
    if (!userAuth || get().socket?.connected) return;
    const socket = io(BASE_URL, {
      query: {
        userId: userAuth.data._id,
      },
    });
    socket.connect();
    set({ socket: socket });

    socket.on("currentlyConnectedUser", (s) => {
      set({ onlineUsers: s });
    });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
