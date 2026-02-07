import { BaseChatMessageHistory } from "@langchain/core/chat_history";
import { BaseMessage, AIMessage, HumanMessage } from "@langchain/core/messages";
import connectToMongoDB from "@/db/mongodb";
import { ChatMessage } from "@/models";
import redis from "@/db/redis";

const CACHE_TTL = 300; // 5 minutes

/**
 * Custom MongoDB-based chat message history for LangChain
 * Stores messages in MongoDB with Redis caching
 */
export class MongoDBChatMessageHistory extends BaseChatMessageHistory {
    async addUserMessage(message: string): Promise<void> {
        return this.addMessage(new HumanMessage(message));
    }
    
    async addAIChatMessage(message: string): Promise<void> {
        return this.addMessage(new AIMessage(message));
    }

    lc_namespace = ["langchain", "stores", "message", "mongodb"];
    
    private sessionId: string;
    
    constructor(fields: { sessionId: string }) {
        super(fields);
        this.sessionId = fields.sessionId;
    }
    
    /**
     * Get all messages for this session
     */
    async getMessages(): Promise<BaseMessage[]> {
        const cacheKey = `cache:chat:${this.sessionId}:langchain`;
        
        // Try Redis cache first
        try {
            const cached = await redis.get(cacheKey);
            if (cached) {
                const messages = JSON.parse(cached);
                return messages.map((msg: any) => 
                    msg.role === 'human' || msg.role === 'user' 
                        ? new HumanMessage(msg.content)
                        : new AIMessage(msg.content)
                );
            }
        } catch (error) {
            console.error('Redis cache read error:', error);
        }
        
        // Get from MongoDB
        await connectToMongoDB();
        const messages = await ChatMessage.find({ sessionId: this.sessionId })
            .sort({ timestamp: 1 })
            .lean()
            .exec();
        
        const baseMessages = messages.map((msg) => 
            msg.role === 'human' || msg.role === 'user'
                ? new HumanMessage(msg.content)
                : new AIMessage(msg.content)
        );
        
        // Cache in Redis
        try {
            const cacheData = messages.map(msg => ({
                role: msg.role,
                content: msg.content,
            }));
            await redis.setex(cacheKey, CACHE_TTL, JSON.stringify(cacheData));
        } catch (error) {
            console.error('Redis cache write error:', error);
        }
        
        return baseMessages;
    }
    
    /**
     * Add a message to the history
     */
    async addMessage(message: BaseMessage): Promise<void> {
        await connectToMongoDB();
        
        const role = message._getType() === 'human' ? 'human' : 'ai';
        
        await ChatMessage.create({
            sessionId: this.sessionId,
            role,
            content: message.content as string,
            timestamp: new Date(),
        });
        
        // Invalidate cache
        const cacheKey = `cache:chat:${this.sessionId}:langchain`;
        const detailCacheKey = `cache:chat:${this.sessionId}:messages`;
        try {
            await redis.del(cacheKey);
            await redis.del(detailCacheKey);
        } catch (error) {
            console.error('Cache invalidation error:', error);
        }
    }
    
    /**
     * Clear all messages for this session
     */
    async clear(): Promise<void> {
        await connectToMongoDB();
        await ChatMessage.deleteMany({ sessionId: this.sessionId });
        
        // Invalidate cache
        const cacheKey = `cache:chat:${this.sessionId}:langchain`;
        const detailCacheKey = `cache:chat:${this.sessionId}:messages`;
        try {
            await redis.del(cacheKey);
            await redis.del(detailCacheKey);
        } catch (error) {
            console.error('Cache invalidation error:', error);
        }
    }
}

/**
 * Create a MongoDB-based chat history instance
 */
export const createMongoDBHistory = (sessionId: string) => {
    return new MongoDBChatMessageHistory({ sessionId });
};
