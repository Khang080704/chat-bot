import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import redis from "@/db/redis";
import connectToMongoDB from "@/db/mongodb";
import { ChatSession, ChatMessage } from "@/models";

export async function DELETE(req: NextRequest) {
    const { chatId } = await req.json();
    const user = await currentUser();

    if (!chatId || !user) {
        return NextResponse.json(
            { error: "Missing userId or chatId" },
            { status: 400 }
        );
    }

    await connectToMongoDB();
    
    // Delete the chat session and all messages from MongoDB
    await ChatSession.deleteOne({ sessionId: chatId, userId: user.id });
    await ChatMessage.deleteMany({ sessionId: chatId });
    
    // Invalidate cache
    const cacheKey = `cache:user:${user.id}:sessions`;
    try {
        await redis.del(cacheKey);
    } catch (error) {
        console.error('Cache invalidation error:', error);
    }

    return NextResponse.json({ message: "Chat deleted" });
}
