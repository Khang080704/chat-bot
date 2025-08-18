import { AgentExecutor, createToolCallingAgent } from "langchain/agents";
import {
    ChatPromptTemplate,
    MessagesPlaceholder,
} from "@langchain/core/prompts";
import { model } from "./model";
import { BufferMemory, ChatMessageHistory } from "langchain/memory";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";
import fs from 'fs'

export function createExecutor(
    systemPrompt: string,
    tools: any[]
) {
    const prompt = ChatPromptTemplate.fromMessages([
        ["system", systemPrompt],
        new MessagesPlaceholder("chat_history"),
        ["human", "{input}"],
        new MessagesPlaceholder("agent_scratchpad"),
    ]);

    const agent = createToolCallingAgent({ llm: model, tools, prompt });
    const excutor = new AgentExecutor({ agent, tools });

    const runnableWithHistory = new RunnableWithMessageHistory({
        runnable: excutor,
        getMessageHistory: async (sessionId: string) => {
            const raw = fs.readFileSync('history.json', 'utf8');
            const messages = JSON.parse(raw);
            const history = new ChatMessageHistory();
            for (const m of messages) {
                if(m.role == "user") {
                    await history.addUserMessage(m.content);    
                }
                else {
                    await history.addAIMessage(m.content);
                }
            }
            return history;
        },
        inputMessagesKey: "input", // khớp với inputKey bạn dùng
        historyMessagesKey: "chat_history",
        outputMessagesKey: "output",
    });

    return runnableWithHistory
}
