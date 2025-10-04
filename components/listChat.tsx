"use client";
import ChatTitle from "./ChatTitle";
import { useEffect } from "react";
import { useSidebar } from "./ui/sidebar";
import {
    setList,
    fetchAllListKeys,
} from "@/redux/features/chatList/chatListSlice";
import { RootState } from "@/redux/store";
import { useAppDispatch, useAppSelector } from "@/hooks/use-dispatch";

export default function ListChat({ list }: { list: any[] }) {
    const dispatch = useAppDispatch();
    const listChat = useAppSelector((state: RootState) => state.chatList.listChat);
    const { state, isMobile } = useSidebar();
    const hidden = state == "collapsed";

    useEffect(() => {
        if (listChat.length === 0) {
            dispatch(setList(list));
        }
        else {
            dispatch(fetchAllListKeys());
        }
    }, []);

    return (
        <div className={hidden ? "hidden" : ""}>
            <h2 className="text-gray-400 text-xl my-2 px-3">Chats</h2>

            <ul>
                {listChat.map((chat) => (
                    <div key={`${chat.sessionId}`} className="cursor-pointer">
                        <ChatTitle
                            chatkey={`${chat.sessionId}`}
                            title={chat.title}
                        />
                    </div>
                ))}
            </ul>
        </div>
    );
}
