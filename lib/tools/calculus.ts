import {
    GoogleGenerativeAIEmbeddings,
    ChatGoogleGenerativeAI,
} from "@langchain/google-genai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { z } from "zod";
import { tool } from "@langchain/core/tools";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { Annotation, StateGraph } from "@langchain/langgraph";
import { Document } from "@langchain/core/documents";
import { pull } from "langchain/hub";
import { ChatPromptTemplate } from "@langchain/core/prompts";

const rag = async ({ text }: { text: string }) => {
    const filePath = process.cwd() + "/public/Huyền sử Silmarillion-2.pdf";
    const loader = new PDFLoader(filePath);
    const docs = await loader.load();

    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
    });

    const chunks = await splitter.splitDocuments(docs);

    const embeddings = new GoogleGenerativeAIEmbeddings({
        apiKey: process.env.GOOGLE_API_KEY,
        model: "text-embedding-004",
    });

    const vectorStore = new MemoryVectorStore(embeddings);
    await vectorStore.addDocuments(chunks);

    const result = await vectorStore.similaritySearch(text);

    return result.map(doc => doc.pageContent).join("\n---\n");
};

export const ragTool = tool(rag, {
    name: "rag_tool",
    description: "Use this tool whenever user ask about the information in The Silmarillion novel",
    schema: z.object({
        text: z.string().describe("User's question"),
    }),
});

