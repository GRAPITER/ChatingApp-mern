import { create } from "zustand";
import { axiosInstanse } from "../lib/axios";
import toast from "react-hot-toast";

export const useMessageStore = create((set) => ({
  users: [],
  messages: [],
  selectedUser: null,
  isUserFetching: false,
  isMessageFetching: false,
  userFetch: async () => {
    set({ isUserFetching: true });
    try {
      const res = await axiosInstanse.get("/message/allUser");
      set({ users: res.data });
      console.log(res.data);
    } catch (error) {
      console.log("from getting user", error);
    } finally {
      set({ isUserFetching: false });
    }
  },

  messageFetch: async (userId) => {
    set({ isMessageFetching: true });
    try {
      const res = await axiosInstanse(`/message/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessageFetching: false });
    }
  },
  //todo optimized later
  setSelectedUser: (user) => {
    set({ selectedUser: user });
  },
}));
