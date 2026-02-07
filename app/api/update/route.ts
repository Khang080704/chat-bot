import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import redis from "@/db/redis";
import connectToMongoDB from "@/db/mongodb";
import { ChatSession } from "@/models";

const CACHE_TTL = 300; // 5 minutes

export async function PATCH(req: NextRequest) {
    const user = await currentUser();
    if (!user) {
        return NextResponse.json({message: 'Unauthorized'}, {status: 401});
    }
    
    const {sessionId, newTitle} = await req.json();

    await connectToMongoDB();
    
    // Update in MongoDB
    const session = await ChatSession.findOneAndUpdate(
        { sessionId, userId: user.id },
        { title: newTitle },
        { new: true }
    );
    
    if (!session) {
        return NextResponse.json({message: 'Session not found'}, {status: 404});
    }
    
    // Invalidate cache
    const cacheKey = `cache:user:${user.id}:sessions`;
    try {
        await redis.del(cacheKey);
    } catch (error) {
        console.error('Cache invalidation error:', error);
    }

    return NextResponse.json({message: 'Update success'}, {status: 200})

}