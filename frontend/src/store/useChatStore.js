import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set , get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/messages/users");
            set({ users: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isUsersLoading: false });
        }

    },

    getMessages: async (userId) => {
        //set({ isUsersLoading: true });
        set({ isMessagesLoading : true });

        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isMessagesLoading: false });
        }

    },
    
    sendMessage: async (messageData) => {
        const {selectedUser , messages} = get();
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}` , messageData);
            //we recieve msg in state and update it.
            set({messages : [...messages , res.data]});
        } catch(error) {
            toast.error(error.response.data.message);
        }
    },


    //need to optimize this.
    setSelectedUser: (selectedUser) => set({selectedUser}),



}))


