import { NextRequest, NextResponse } from "next/server";
import redis from "@/db/redis";

export async function POST(req: NextRequest) {
    const {sessionId} = await req.json();
    const chatHistory = await redis.lrange(`${sessionId}`, 0, -1);
    const parsedHistory = chatHistory.map((item) => {
        const parse = JSON.parse(item);
        return {
            id: parse.id,
            role: parse.type === 'human' ? 'user' : 'assistant',
            content: parse.data.content,
        };
    }).reverse();
    return NextResponse.json({response: parsedHistory})
}