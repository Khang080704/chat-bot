'use server'
import { currentUser } from "@clerk/nextjs/server";
import redis from "@/db/redis";

export async function getAllListKeys() {
    const user = await currentUser();
    const listChat = await redis.lrange(`${user?.id}`, 0, -1);
    return listChat.map(item => {
        const { sessionId, title } = JSON.parse(item);
        return { sessionId, title };
    });
}