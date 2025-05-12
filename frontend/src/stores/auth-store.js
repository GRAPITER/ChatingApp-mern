import { create } from "zustand";
import { axiosInstanse } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  userAuth: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLogingIn: false,
  isUploadingProfile: false,
  checkAuth: async () => {
    try {
      const res = await axiosInstanse.get("/auth/checkauth");
      set({ userAuth: res.data });
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
      console.log("data which filled by user who want to be signed in", data);
      const res = await axiosInstanse.post("/auth/signup", data);
      set({ userAuth: res.data });
      console.log("this is the response which server send to us", res);
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
}));
