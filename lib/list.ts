'use server'
import { currentUser } from "@clerk/nextjs/server";
import redis from "@/db/redis";
import connectToMongoDB from "@/db/mongodb";
import { ChatSession } from "@/models";

const CACHE_TTL = 300; // 5 minutes

/**
 * Get all chat sessions for the current user
 * @returns An array of chat session objects
 */
export async function getAllListKeys() {
    const user = await currentUser();
    if (!user) return [];
    
    const cacheKey = `cache:user:${user.id}:sessions`;
    
    // Try to get from Redis cache first
    try {
        const cached = await redis.get(cacheKey);
        if (cached) {
            return JSON.parse(cached);
        }
    } catch (error) {
        console.error('Redis cache read error:', error);
    }
    
    // If not in cache, get from MongoDB
    await connectToMongoDB();
    const sessions = await ChatSession.find({ userId: user.id })
        .sort({ updatedAt: -1 })
        .lean()
        .exec();
    
    const result = sessions.map(s => ({
        sessionId: s.sessionId,
        title: s.title,
        createdAt: s.createdAt.getTime(),
        updatedAt: s.updatedAt.getTime(),
    }));
    
    // Cache the result in Redis with TTL
    try {
        await redis.setex(cacheKey, CACHE_TTL, JSON.stringify(result));
    } catch (error) {
        console.error('Redis cache write error:', error);
    }
    
    return result;
}