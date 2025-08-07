import { create } from 'zustand'

export const useAuthStore = create((set) => ({
    auth: localStorage.getItem('token') || null,

    setAuth: (token) => {
        localStorage.setItem('token', token);
        set({ auth: token });
    },

    authLogout: () => {
        localStorage.removeItem('token');
        set({ auth: null });
    },
}));
