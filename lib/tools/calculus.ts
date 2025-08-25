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

const rag = async ({ text }: { text: string }) => {
    const filePath = process.cwd() + "/public/vtp1.pdf";
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

    const promptTemplate = await pull("rlm/rag-prompt");

    const InputStateAnnotation = Annotation.Root({
        question: Annotation<string>,
    });
    const StateAnnotation = Annotation.Root({
        question: Annotation<string>,
        context: Annotation<Document[]>,
        answer: Annotation<string>,
    });

    const retrieve = async (state: typeof InputStateAnnotation.State) => {
        const retrievedDocs = await vectorStore.similaritySearch(
            state.question,
        );
        return { context: retrievedDocs };
    };

    const llm = new ChatGoogleGenerativeAI({
        model: "gemini-2.0-flash",
        apiKey: process.env.GOOGLE_API_KEY,
        temperature: 0,
    });

    const generate = async (state: typeof StateAnnotation.State) => {
        const docsContent = state.context
            .map((doc) => doc.pageContent)
            .join("\n");
        const messages = await promptTemplate.invoke({
            question: state.question,
            context: docsContent,
        });
        const response = await llm.invoke(messages);
        return { answer: response.content };
    };

    // Compile application and test
    const graph = new StateGraph(StateAnnotation)
        .addNode("retrieve", retrieve)
        .addNode("generate", generate)
        .addEdge("__start__", "retrieve")
        .addEdge("retrieve", "generate")
        .addEdge("generate", "__end__")
        .compile();

    let inputs = { question: text };

    const result = await graph.invoke(inputs);
    console.log(result.answer);

    return result.answer;
};

export const ragTool = tool(rag, {
    name: "rag_tool",
    description: "Dùng công cụ này khi người dùng hỏi về lĩnh vực vi tích phân (ánh xạ, hàm số, tích phân,...)",
    schema: z.object({
        text: z.string().describe("Câu hỏi từ người dùng"),
    }),
});

