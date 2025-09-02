import fs from "fs"
import {z} from "zod"
import {tool} from "@langchain/core/tools"

const writeToFile = async ({filename, content, append=false}: {filename: string, content: string, append: boolean}) => {
    if(append) {
        await fs.appendFileSync(filename, content, "utf8");
        return "Append successfully"
    }
    await fs.writeFileSync(filename, content, "utf8")
    return "Write down successfully"
}

const writeJson = async ({filename='history.json', content}: {filename: string, content: any[]}) => {
    const jsonString = JSON.stringify(content, null, 2);
    await fs.writeFileSync(filename, jsonString, "utf8");
}

export const fileTool = tool(writeToFile, {
    name: 'file_working',
    description: 'Using this tool when user askes to write down something to file',
    schema: z.object({
        filename: z.string().describe("This is filename. User will provide"),
        content: z.string().describe("This is content written to file, user will provide the content"),
        append: z.boolean().describe("If user asks to write append, set this to true. If user doens't say anything or doens't allow to append, set this to false")
    })
})

export const writeJsonTool = tool(writeJson, {
    name: 'json_file',
    description: 'Using this tool when user asks to write down something to json file. Whenever user ask and you answer a question, an array of history chat will be sent to api, you always use that history to write to file',
    schema: z.object({
        filename: z.string().describe("This is filename. It's history.json"),
        content: z.any().describe("This is content written to file, the content will be the his variable in POST api"),
    })
})
