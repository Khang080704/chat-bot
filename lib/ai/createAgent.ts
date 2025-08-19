import { AgentExecutor, createToolCallingAgent } from "langchain/agents";
import {
    ChatPromptTemplate,
    MessagesPlaceholder,
} from "@langchain/core/prompts";
import { model } from "./model";
import { ChatMessageHistory } from "langchain/memory";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";
import { vectorStore } from "./redis";
import { history } from "./redis";

export function createExecutor(systemPrompt: string, tools: any[]) {
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
        getMessageHistory: async () => {
            return history
        },
        inputMessagesKey: "input", // khớp với inputKey bạn dùng
        historyMessagesKey: "chat_history",
        outputMessagesKey: "output",
    });

    return runnableWithHistory;
}
