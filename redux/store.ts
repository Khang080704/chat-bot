// store.ts
import { configureStore } from "@reduxjs/toolkit";
import chatListSlice from "./features/chatList/chatListSlice";

export const store = configureStore({
    reducer: {
        chatList: chatListSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
