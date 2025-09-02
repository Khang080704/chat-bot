import { createStore, create } from "zustand";
import { getAllListKeys } from "@/lib/list";

type chatSession = {
    sessionId: string;
    title: string;
    createdAt: number;
    updatedAt: number;
};

type ChatListStore = {
    listChat: chatSession[];
    addList: (chatId: chatSession) => void;
    removeList: (chatId: string) => void;
    getAllListKeys: () => Promise<void>;
    updateSession: (sessionId: string, updatedAt: number) => Promise<void>;
    setList: (list: chatSession[]) => void;
};

export const chatListStore = create<ChatListStore>((set) => ({
    listChat: [],
    addList: (chatId: chatSession) =>
        set((state) => ({
            listChat: [chatId, ...state.listChat],
        })),
    removeList: (chatId: string) =>
        set((state) => ({
            listChat: state.listChat.filter((id) => id.sessionId !== chatId),
        })),
    getAllListKeys: async () => {
        const result = await getAllListKeys();
        set({ listChat: result });
    },
    updateSession: async (sessionId: string, updatedAt: number) => {
        set((state) => ({
            listChat: state.listChat.map((chat) =>
                chat.sessionId === sessionId ? { ...chat, updatedAt } : chat
            ).sort((a, b) => b.updatedAt - a.updatedAt),
        }));
    },
    setList: (list: chatSession[]) => {
        set({ listChat: list });
    },
}));
