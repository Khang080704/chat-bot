import {tavily} from '@tavily/core'
import z from 'zod';
import {tool} from '@langchain/core/tools';

export const searchFromWiki = async ({text}: {text: string}) => {
    const res = await fetch(
        `https://en.wikipedia.org/w/api.php?action=parse&page=${text}&format=json`
    );
    const respone = await res.json();
    return respone;
};

const searchFromTavily = async ({text}: {text: string}) => {
    const tvl = tavily({
        apiKey: process.env.TAVILY_API_KEY
    })
    const result = await tvl.search(text)

    return result;
};

export const WikiTool = tool(searchFromWiki,{
    name: 'search_wiki',
    description: "Searching information with wikipedia. Passing the text argument. When the argument is a name of a novel, using this tool",
    schema: z.object({
        text: z.string().describe("param for tool")
    }),
})

export const TavilyTool = tool(searchFromTavily ,{
    name: "seach_tavily",
    description: "General tool search. Using for all questions except the questions that have the name of a novel",
    schema: z.object({
        text: z.string().describe("param for tool")
    })
})

