import * as cheerio from "cheerio";
import * as langchain from 'langchain/tools'
import {tool} from "@langchain/core/tools"
import z from "zod";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";

const browser = async({url}: {url: string}) => {
    const loader = new CheerioWebBaseLoader(url);
    const docs = await loader.load();

    return docs.map(doc => doc.pageContent).join("\n---\n");
};

export const browserTool = tool(browser, {
    name: "browser_tool",
    description: "Using this tool when user ask you to summarize a web pages. You will receive a url and return to user its content",
    schema: z.object({
        url: z.string(),
    }),
});
