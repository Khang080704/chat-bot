import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { createClient } from "redis";
import { RedisVectorStore } from "@langchain/redis";
import { RedisChatMessageHistory } from "@langchain/redis";

const embedding = new GoogleGenerativeAIEmbeddings({
    model: "gemini-embedding-001",
    apiKey: process.env.GOOGLE_API_KEY,
});

const client = createClient({
    url: process.env.REDIS_URL! ?? "redis://localhost:6379",
});

await client.connect();

export const createHistory = (sessionId: string) => {
    return new RedisChatMessageHistory({
        sessionId,
        client,
    });
};

export const vectorStore = new RedisVectorStore(embedding, {
    redisClient: client as any,
    indexName: "chatbot_2",
});
