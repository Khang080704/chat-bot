import { createExecutor } from "@/lib/ai/createAgent";
import { WikiTool, TavilyTool } from "@/lib/tools/search";
import { fileTool, writeJsonTool } from "@/lib/tools/file";
import { NextResponse } from "next/server";
import fs from 'fs';

const tools = [WikiTool, TavilyTool, fileTool];

export async function POST(request: Request) {
    const { message, his } = await request.json();
    his.session='user-123'

    fs.writeFileSync('history.json', JSON.stringify(his, null, 2), "utf8");

    const executor = createExecutor(
        "You are a helpful assistance that help user answer the following information. You have to access these tools and respone to user the information",
        tools
    );

    const agentResult = await executor.invoke({
        input: message
    }, {
        configurable: {
            sessionId: '123'
        }
    })


    return NextResponse.json(agentResult);
}
