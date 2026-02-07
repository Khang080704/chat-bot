import { NextRequest, NextResponse } from "next/server";
import redis from "@/db/redis";
import connectToMongoDB from "@/db/mongodb";
import { ChatMessage } from "@/models";

const CACHE_TTL = 300; // 5 minutes

export async function POST(req: NextRequest) {
    const {sessionId} = await req.json();
    
    const cacheKey = `cache:chat:${sessionId}:messages`;
    
    // Try to get from Redis cache first
    try {
        const cached = await redis.get(cacheKey);
        if (cached) {
            return NextResponse.json({response: JSON.parse(cached)});
        }
    } catch (error) {
        console.error('Redis cache read error:', error);
    }
    
    // If not in cache, get from MongoDB
    await connectToMongoDB();
    const messages = await ChatMessage.find({ sessionId })
        .sort({ timestamp: 1 })
        .lean()
        .exec();
    
    const parsedHistory = messages.map((msg) => ({
        id: msg._id as unknown as string,
        role: msg.role === 'human' || msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content,
    }));
    
    // Cache the result in Redis with TTL
    try {
        await redis.setex(cacheKey, CACHE_TTL, JSON.stringify(parsedHistory));
    } catch (error) {
        console.error('Redis cache write error:', error);
    }
    
    return NextResponse.json({response: parsedHistory});
}