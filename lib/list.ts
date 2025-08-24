'use server'
import { currentUser } from "@clerk/nextjs/server";
import redis from "@/db/redis";

export async function getAllListKeys() {
    const user = await currentUser();
    const listChat = await redis.hgetall(`user:${user?.id}:sessions`);
    // return listChat.map(item => {
    //     const { sessionId, title } = JSON.parse(item);
    //     return { sessionId, title };
    // });
    return Object.values(listChat).map((s) => JSON.parse(s));
}