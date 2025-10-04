export type chatSession = {
    sessionId: string;
    title: string;
    createdAt: number;
    updatedAt: number;
};

export type ChatListState = {
    listChat: chatSession[];
    loading: boolean;
};
