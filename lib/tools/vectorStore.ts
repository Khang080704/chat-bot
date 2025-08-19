import {GoogleGenerativeAIEmbeddings} from '@langchain/google-genai'
import { createClient } from 'redis'
import {RedisVectorStore} from '@langchain/redis'

import z from 'zod';
import {tool} from '@langchain/core/tools';
import { vectorStore } from '../ai/redis';



const vectorStoreQuery = async ({query}: {query: string}) => {
    const result = await vectorStore.similaritySearch(query, 5);
    return JSON.stringify(result);
}

export const vectorStoreTool = tool(vectorStoreQuery, {
    name: 'vector_store_query',
    description: "use this tool to query the memory of the conversation, always use this function when you answer user's questions",
    schema: z.object({
        query: z.string().min(2).max(1000)
    })
})