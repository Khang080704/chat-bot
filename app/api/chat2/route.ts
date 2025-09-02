import { createExecutor } from "@/lib/ai/createAgent";

import { NextResponse } from "next/server";
import redis from "@/db/redis";
import { currentUser } from "@clerk/nextjs/server";
import { model } from "@/lib/ai/model";

//import tool
import { ragTool } from "@/lib/tools/calculus";
import { browserTool } from "@/lib/tools/browser";
import { WikiTool, TavilyTool } from "@/lib/tools/search";
import { fileTool } from "@/lib/tools/file";

const tools = [TavilyTool, fileTool, browserTool];

export async function POST(request: Request) {
    const { message, sessionId } = await request.json();
    const user = await currentUser();
    Date.now().toString();

    let chatTitle = "";
    if (user) {
        //new chat
        const chats = await redis.hgetall(`user:${user.id}:sessions`);
        const parsedChats = Object.values(chats).map((item) =>
            JSON.parse(item)
        );
        if (!parsedChats.some((chat) => chat.sessionId === sessionId)) {
            const titlePrompt = `Briefly summarize the following question into a short title, right in regular text:\n\n${message}`;
            const title = await model.invoke(titlePrompt);
            chatTitle = title.content as string;
            await redis.hset(
                `user:${user.id}:sessions`,
                sessionId,
                JSON.stringify({
                    sessionId: `${sessionId}`,
                    title: title.content,
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                })
            );
        } else {
            //exits chat
            const key = `user:${user?.id}:sessions`;
            const chat = await redis.hget(key, sessionId);
            if (chat) {
                const parsedChat = JSON.parse(chat);
                await redis.hset(
                    key,
                    sessionId,
                    JSON.stringify({
                        ...parsedChat,
                        updatedAt: Date.now(),
                    })
                );
            }
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

    return NextResponse.json({ agentResult, chatTitle });
}
