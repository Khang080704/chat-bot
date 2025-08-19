import redis from "@/db/redis";
import ChatTitle from "./ChatTitle";
import { currentUser } from "@clerk/nextjs/server";

async function getAllListKeys() {
    const user = await currentUser();
    const listChat = await redis.lrange(`${user?.id}`, 0, -1);
    return listChat
}

export default async function ListChat() {
    const listChat = await getAllListKeys()
    return (
        <div>
            <h2>Chat List</h2>
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
