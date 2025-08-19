import { createExecutor } from "@/lib/ai/createAgent";
import { WikiTool, TavilyTool } from "@/lib/tools/search";
import { fileTool } from "@/lib/tools/file";
import { NextResponse } from "next/server";

const tools = [WikiTool, TavilyTool, fileTool];

export async function POST(request: Request) {
    const { message, sessionId } = await request.json();

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
