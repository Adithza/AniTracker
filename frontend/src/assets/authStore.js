
import { create } from "zustand";

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error:null,
    isLoading:false,
    isCheckingAuth:true,

    register: async (email, username, password) => {
        set({ isLoading: true, error: null});
        try {
            const response = await fetch("http://localhost:3000/auth/register", {
            method: "POST",
            headers: {
            "Content-type": "application/json"
            },
            body: JSON.stringify({email: email, username: username, password: password})
        })
        set({isLoading:false})
        const data = response.json();
        return data;
    } catch (error) {
        set({error: error.message || "Error signing up", isLoading: false});
        throw error;
    }
    },

    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null});
        try {
            const response = await fetch("http://localhost:3000/auth/checkAuth", { credentials:"include"})
            const data = await response.json()
            if (data.user) {
                set({ user: data.user, isAuthenticated: true, isCheckingAuth: false });
            } else {
                set({ user: null, isAuthenticated: false, isCheckingAuth: false });
            }
 
        } catch (error) {
            set({ error: null, isCheckingAuth: false, isAuthenticated: false});
            throw error;
        }
    },

    login: async (email, password) => {
        set({isLoading:true, error:null});
        try {
            const response = await fetch("http://localhost:3000/auth/login", {
                credentials:"include",
                method:"POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });
            const data = await response.json()
            if (data.user) {
                set({ user: data.user, isAuthenticated: true, isCheckingAuth: false, isLoading:false });
            } else {
                set({ user: null, isAuthenticated: false, isCheckingAuth: false, isLoading:false });
            }
            return data;
        } catch (error) {
            throw error;
        }
    },

    logout: async() => {
        set({isLoading: true, error:null})
        try{
            const response = await fetch("http://localhost:3000/auth/logout", {credentials:"include"});
            const data = await response.json();
            set({user: null, isAuthenticated:false, isLoading:false})
        } catch (error) {
            throw error;
        }
    }
}))