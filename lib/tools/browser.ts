import * as cheerio from "cheerio";
import * as langchain from 'langchain/tools'
import {tool} from "@langchain/core/tools"
import z from "zod";

const browser = async({url}: {url: string}) => {
    const res = await cheerio.fromURL(url);
    const docs = res.text();

    return docs;
};

export const browserTool = tool(browser, {
    name: "browser_tool",
    description: "Using this tool when user ask you to summarize a web pages. You will receive a url and return to user its content",
    schema: z.object({
        url: z.string(),
    }),
});
