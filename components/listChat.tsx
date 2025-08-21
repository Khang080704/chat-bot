'use client'
import ChatTitle from "./ChatTitle";
import { chatListStore } from "@/app/store/list";

export default function ListChat() {
    const listChat = chatListStore(state => state.listChat)
    return (
        <div className="">
            <h2 className="text-gray-400 text-xl my-2 px-3">Chats</h2>
            <ul>
                {listChat.map((chat) => (
                    <div key={`${chat.sessionId}`} className="cursor-pointer">
                        <ChatTitle chatkey={`${chat.sessionId}`} title={chat.title}/>
                    </div>
                ))}
            </ul>
        </div>
    );
}
