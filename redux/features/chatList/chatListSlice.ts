import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getAllListKeys } from "@/lib/list";
import { chatSession, ChatListState } from "./chatListSliceType";

const initialState: ChatListState = {
    listChat: [],
    loading: false,
};

export const fetchAllListKeys = createAsyncThunk(
    "chatList/fetchAllListKeys",
    async () => {
        const response = await getAllListKeys();
        return response as chatSession[];
    }
);

const chatListSlice = createSlice({
    name: "chatList",
    initialState,
    reducers: {
        addList: (state, action: PayloadAction<chatSession>) => {
            state.listChat.unshift(action.payload);
        },
        removeList: (state, action: PayloadAction<string>) => {
            state.listChat = state.listChat.filter(
                (chat) => chat.sessionId !== action.payload
            );
        },
        updateSession: (
            state,
            action: PayloadAction<{ sessionId: string; updatedAt: number }>
        ) => {
            const { sessionId, updatedAt } = action.payload;
            state.listChat = state.listChat
                .map((chat) =>
                    chat.sessionId === sessionId ? { ...chat, updatedAt } : chat
                )
                .sort((a, b) => b.updatedAt - a.updatedAt);
        },
        setList: (state, action: PayloadAction<chatSession[]>) => {
            state.listChat = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllListKeys.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllListKeys.fulfilled, (state, action) => {
                state.loading = false;
                state.listChat = action.payload;
            })
            .addCase(fetchAllListKeys.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { addList, removeList, updateSession, setList } =
    chatListSlice.actions;

export default chatListSlice.reducer;
