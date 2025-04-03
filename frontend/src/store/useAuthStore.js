//here we will have diff bunch of states. and functions that we can use
//in diff components.

import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";
import {io} from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const useAuthStore = create((set , get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers : [],
    socket:null,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");

            set({ authUser: await res.data });
            get().connectSocket();
        }
        catch (error) {
            console.log("Error in checkAuth : ", error);
            set({ authUser: null });
        }
        finally {
            set({ isCheckingAuth: false });
        }
    },

    //same for signup, we connect socket for showing online 
    signup: async (data) => {
        set({ isSigningUp: true })
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data })
            toast.success("Account created successfully");
            get().connectSocket();

        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isSigningUp: false });
        }
    },
    
    //want to connect a socket as soon as login happens.
    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            toast.success("Logged in successfully");

            get().connectSocket();
        } catch (error) {
            const errorMessage = error.response?.data?.message;
            toast.error(errorMessage);
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logged out successfully");
            //socket.
            get().disconnectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const res = axiosInstance.put('/auth/update-profile', data);
            set({ authUser: res.data });
            toast.success("Profile updated successfully")
        } catch (error) {
            console.log("error in updating profile : ", error);
            toast.error(error.response.data.message)
        } finally {
            set({ isUpdatingProfile: false });
        }
    },

    connectSocket : () => {
        //for checking if connection is authenticated.
        const {authUser} = get();
        if(!authUser || get().socket?.connected) return
        //optimisation above.

        const socket = io(BASE_URL , {
            query: {
                userId : authUser._id,
            },
        });
        socket.connect();

        set({socket : socket});

        socket.on("getOnlineUsers" , (userIds) => {
            set({ onlineUsers : userIds });
        })

    },

    //for logout 
    disconnectSocket : () => {
        if(get().socket?.connected) get().socket.disconnect();
    }

}))