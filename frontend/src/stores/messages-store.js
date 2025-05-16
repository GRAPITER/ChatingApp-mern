import { create } from "zustand";
import { axiosInstanse } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./auth-store";

export const useMessageStore = create((set, get) => ({
  users: [],
  messages: [],
  selectedUser: null,
  isUserFetching: false,
  isMessageFetching: false,
  userFetch: async () => {
    try {
      set({ isUserFetching: true });
      const res = await axiosInstanse.get("/message/allUser");
      set({ users: res.data.data });
    } catch (error) {
      console.log("from getting user", error);
    } finally {
      set({ isUserFetching: false });
    }
  },

  messageFetch: async (userId) => {
    set({ isMessageFetching: true });
    try {
      const res = await axiosInstanse.get(`/message/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessageFetching: false });
    }
  },

  sendMessage: async (data) => {
    try {
      const { selectedUser, messages } = get();
      const res = await axiosInstanse.post(
        `message/send/${selectedUser._id}`,
        data
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      console.log(error);
    }
  },

  SubscribeMessageSocket: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("userNewMessage", (message) => {
      if (message.senderId !== selectedUser._id) return;
      set({ messages: [...get().messages, message] });
    });
  },

  unSubscribeMessageSocet: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("userNewMessage");
  },

  setSelectedUser: (user) => {
    set({ selectedUser: user });
  },
}));
