import { create } from "zustand";

type User = {
    id: string,
    name: string,
    phone: string,
};

type ChatStore = {
    selectedUser: User | null;
    setSelectedUser: (user: User) => void;
};

export const useChatStore = create<ChatStore>((set) => ({
    selectedUser: null,
    setSelectedUser: (user) => set({selectedUser: user}),
}));