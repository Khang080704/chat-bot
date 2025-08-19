import redis from "@/db/redis";
import ChatTitle from "./ChatTitle";

async function getAllListKeys() {
    let cursor = "0";
    let listKeys: string[] = [];

    do {
        const [nextCursor, keys] = await redis.scan(cursor);
        cursor = nextCursor;

        for (const key of keys) {
            const type = await redis.type(key);
            if (type === "list") {
                listKeys.push(key);
            }
        }
    } while (cursor !== "0");

    return listKeys;
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
