'use client'
import ChatTitle from "./ChatTitle";
import { chatListStore } from "@/app/store/list";

export default function ListChat() {
    const listChat = chatListStore(state => state.listChat);
    return (
        <div className="">
            <h2 className="text-gray-400 text-xl my-2 px-3">Chats</h2>
            <ul>
                {listChat.map((chatKey) => (
                    <div key={chatKey} className="cursor-pointer">
                        <ChatTitle chatkey={chatKey}/>
                    </div>
                ))}
            </ul>
        </div>
    );
}
