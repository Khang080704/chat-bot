"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    PromptInput,
    PromptInputTextarea,
    PromptInputToolbar,
    PromptInputSubmit,
} from "@/components/ui/shadcn-io/ai/prompt-input";
import { Message, MessageContent } from "@/components/ui/shadcn-io/ai/message";
import { Loader } from "@/components/ui/shadcn-io/ai/loader";
import {
    Conversation,
    ConversationContent,
    ConversationScrollButton,
} from "@/components/ui/shadcn-io/ai/conversation";
import { Response } from "@/components/ui/shadcn-io/ai/response";
import { addList } from "@/redux/features/chatList/chatListSlice";
import { useAppDispatch } from "@/hooks/use-dispatch";

type Message = {
    id: string;
    role: "user" | "assistant";
    content: string;
};

export default function Page() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();

    async function sendMessage(input: string) {
        setLoading(true);
        const newMessages: Message[] = [
            ...messages,
            { id: crypto.randomUUID(), role: "user", content: input },
        ];
        const sessionId = crypto.randomUUID();

        setMessages(newMessages);

        const res = await fetch("/api/chat2", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: input,
                sessionId,
            }),
        });

        const data = await res.json();
        setMessages((prev) => [
            ...prev,
            {
                id: crypto.randomUUID(),
                role: "assistant",
                content: data.agentResult.output,
            },
        ]);
        dispatch(
            addList({
                sessionId: `${sessionId}`,
                title: data.chatTitle,
                createdAt: Date.now(),
                updatedAt: Date.now(),
            })
        );
        setLoading(false);
        router.push(`/c/${sessionId}`);
    }

    return (
        <div className={`w-full sm:px-5 mx-auto flex flex-col h-screen py-6 px-2 ${messages.length === 0 ? "justify-center items-center" : ""}`}>
            {messages.length !== 0 ? (
                <Conversation className="w-full relative h-120">
                    <ConversationContent>
                        {messages.map((message, index) => (
                            <Message from={message.role} key={index}>
                                <MessageContent role={message.role}>
                                    {message.role === "assistant" ? (
                                        <Response>{message.content}</Response>
                                    ) : (
                                        message.content
                                    )}
                                </MessageContent>
                            </Message>
                        ))}

                        {loading && <Loader />}
                    </ConversationContent>

                    <ConversationScrollButton />
                </Conversation>
            ) : (
                <p className="my-auto sm:my-20 text-2xl">How can I help you today?</p>
            )}
            <PromptInput
                onSubmit={(e) => {
                    e.preventDefault();
                    if (input.trim()) {
                        sendMessage(input);
                        setInput("");
                    }
                }}
                className="flex items-center gap-2"
            >
                <PromptInputTextarea
                    value={input}
                    onChange={(e: any) => setInput(e.target.value)}
                    placeholder="Type your message..."
                />

                <PromptInputToolbar className="h-10 px-6 rounded-3xl">
                    <PromptInputSubmit disabled={!input.trim()} />
                </PromptInputToolbar>
            </PromptInput>
        </div>
    );
}
