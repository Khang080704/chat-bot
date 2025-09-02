"use client";
import { chatListStore } from "@/app/store/list";
import ChatTitle from "./ChatTitle";
import { useEffect } from "react";
import { useSidebar } from "./ui/sidebar";

export default function ListChat({ list }: { list: any[] }) {
    const { setList, listChat } = chatListStore();
    const { state, isMobile } = useSidebar();
    const hidden = (state == "collapsed" ) 

    useEffect(() => {
        if(listChat.length === 0) {
            setList(list);
        }
        else {
            setList(listChat);
        }
    }, []);


    return (
        <div className={hidden ? "hidden" : ''}>
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
