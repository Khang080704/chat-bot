import { createStore, create } from "zustand";
import { getAllListKeys } from "@/lib/list";

type chatSession = {
    sessionId: string;
    title: string;
};

type ChatListStore = {
    listChat: chatSession[];
    addList: (chatId: chatSession) => void;
    removeList: (chatId: string) => void;
    getAllListKeys: () => Promise<void>;
};

export const chatListStore = create<ChatListStore>((set) => ({
    listChat: [],
    addList: (chatId: chatSession) =>
        set((state) => ({
            listChat: [...state.listChat, chatId],
        })),
    removeList: (chatId: string) =>
        set((state) => ({
            listChat: state.listChat.filter((id) => id.sessionId !== chatId),
        })),
    getAllListKeys: async () => {
        const result = await getAllListKeys();
        set({ listChat: result });
    },
}));
