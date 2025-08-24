'use server'
import { currentUser } from "@clerk/nextjs/server";
import redis from "@/db/redis";
/**
 * Get all chat sessions for the current user
 * @returns An array of chat session objects
 */
export async function getAllListKeys() {
    const user = await currentUser();
    const listChat = await redis.hgetall(`user:${user?.id}:sessions`);
    return Object.values(listChat).map((s) => JSON.parse(s));
}