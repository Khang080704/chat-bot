import { createExecutor } from "@/lib/ai/createAgent";
import { WikiTool, TavilyTool } from "@/lib/tools/search";
import { fileTool } from "@/lib/tools/file";
import { NextResponse } from "next/server";
import redis from "@/db/redis";
import { currentUser } from "@clerk/nextjs/server";

const tools = [WikiTool, TavilyTool, fileTool];

export async function POST(request: Request) {
    const { message, sessionId } = await request.json();
    const user = await currentUser();

    if(user) {
        const chats = await redis.lrange(`${user.id}`, 0, -1);
        if(!chats.includes(sessionId)) {
            await redis.lpush(`${user.id}`, sessionId);
        }
    }


    const executor = createExecutor(
        "You are a helpful assistance that help user answer the following information. You have to access these tools and respone to user the information",
        tools
    );

    const agentResult = await executor.invoke(
        {
            input: message,
        },
        {
            configurable: {
                sessionId: `${sessionId}`,
            },
        }
    );

    return NextResponse.json(agentResult);
}
