'use client'
import { chatListStore } from "@/app/store/list";
import { useEffect } from "react";

export default function FetchChatList() {
    const setChat = chatListStore(state => state.getAllListKeys);
    useEffect(() => {
        setChat();
    }, []);
    return null
}