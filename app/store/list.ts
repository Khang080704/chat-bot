import { createStore, create } from "zustand";
import { getAllListKeys } from "@/lib/list";

type ChatListStore = {
    listChat: string[];
    addList: (chatId: string) => void;
    removeList: (chatId: string) => void;
    getAllListKeys: () => Promise<void>;
};

export const chatListStore = create<ChatListStore>((set) => ({
    listChat: [],
    addList: (chatId: string) =>
        set((state) => ({
            listChat: [...state.listChat, chatId],
        })),
    removeList: (chatId: string) =>
        set((state) => ({
            listChat: state.listChat.filter((id) => id !== chatId),
        })),
    getAllListKeys: async () => {
        const result = await getAllListKeys();
        set({ listChat: result });
    },
}));
