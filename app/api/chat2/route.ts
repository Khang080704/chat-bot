import { createExecutor } from "@/lib/ai/createAgent";

import { NextResponse } from "next/server";
import redis from "@/db/redis";
import { currentUser } from "@clerk/nextjs/server";
import { model } from "@/lib/ai/model";
import connectToMongoDB from "@/db/mongodb";
import { ChatSession } from "@/models";

//import tool
import { ragTool } from "@/lib/tools/calculus";
import { browserTool } from "@/lib/tools/browser";
import { WikiTool, TavilyTool } from "@/lib/tools/search";
import { fileTool } from "@/lib/tools/file";

const tools = [TavilyTool, fileTool, browserTool, WikiTool];
const CACHE_TTL = 300; // 5 minutes

export async function POST(request: Request) {
    const { message, sessionId } = await request.json();
    const user = await currentUser();
    Date.now().toString();

    let chatTitle = "";
    if (user) {
        await connectToMongoDB();
        
        // Check if session exists
        const existingSession = await ChatSession.findOne({ sessionId, userId: user.id });
        
        if (!existingSession) {
            // New chat - generate title
            const titlePrompt = `Briefly summarize the following question into a short title, right in regular text:\n\n${message}`;
            const title = await model.invoke(titlePrompt);
            chatTitle = title.content as string;
            
            // Create new session in MongoDB
            await ChatSession.create({
                sessionId,
                userId: user.id,
                title: title.content,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        } else {
            // Existing chat - update timestamp
            existingSession.updatedAt = new Date();
            await existingSession.save();
        }
        
        // Invalidate cache for user's session list
        const cacheKey = `cache:user:${user.id}:sessions`;
        try {
            await redis.del(cacheKey);
        } catch (error) {
            console.error('Cache invalidation error:', error);
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
