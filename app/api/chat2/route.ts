import { createExecutor } from "@/lib/ai/createAgent";
import { WikiTool, TavilyTool } from "@/lib/tools/search";
import { fileTool } from "@/lib/tools/file";
import { NextResponse } from "next/server";
import redis from "@/db/redis";
import { currentUser } from "@clerk/nextjs/server";
import { browserTool } from "@/lib/tools/browser";
import { model } from "@/lib/ai/model";

const tools = [WikiTool, TavilyTool, fileTool, browserTool];

export async function POST(request: Request) {
    const { message, sessionId } = await request.json();
    const user = await currentUser();

    let chatTitle = ""
    if (user) {
        const chats = await redis.lrange(`${user.id}`, 0, -1);
        const parsedChats = chats.map(item => JSON.parse(item));
        if (!parsedChats.some(chat => chat.sessionId === sessionId)) {
            const titlePrompt = `Briefly summarize the following question into a short title, right in regular text:\n\n${message}`;
            const title = await model.invoke(titlePrompt);
            chatTitle = title.content as string;
            await redis.hset(`user:${user.id}:sessions`, sessionId, JSON.stringify({ sessionId: `${sessionId}`, title: title.content }));
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

    return NextResponse.json({agentResult, chatTitle});
}
