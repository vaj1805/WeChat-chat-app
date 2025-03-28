//here we will have diff bunch of states. and functions that we can use
//in diff components.

import {create} from "zustand";
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set) => ({
    authUser : null,
    isSigningUp : false,
    isLoggingIn : false,
    isUpdatingProfile : false,

    isCheckingAuth : true,

    checkAuth : async () => {
        try {
            const res = axiosInstance.get("/auth/check");

            set({authUser : await res.data})
        }
        catch(error) {
            console.log("Error in checkAuth : " , error);
            set({authUser : null});
        }
        finally {
            set({isCheckingAuth : false});
        }
    }

    signup : async (data) => {
        
    }

}))