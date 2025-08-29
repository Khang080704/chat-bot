"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import {
    Message,
    MessageAvatar,
    MessageContent,
} from "@/components/ui/shadcn-io/ai/message";
import {
    PromptInput,
    PromptInputTextarea,
    PromptInputToolbar,
    PromptInputSubmit,
} from "@/components/ui/shadcn-io/ai/prompt-input";
import { Loader } from "@/components/ui/shadcn-io/ai/loader";
import {
    Conversation,
    ConversationContent,
    ConversationScrollButton,
} from "@/components/ui/shadcn-io/ai/conversation";
import { Response } from "@/components/ui/shadcn-io/ai/response";
import Logo from "@/public/ChatGPT-Logo.png";
import { useChatDetail } from "@/hooks/user-chat-detail";
import { useCurrentUser } from "@/hooks/use-user";
import { chatListStore } from "@/app/store/list";

type Message = {
    id: string;
    role: "user" | "assistant";
    content: string;
};

export default function Page() {
    const id = useParams().id as string;
    const { data, error, isLoading } = useChatDetail(id);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const { data: userData } = useCurrentUser();
    const list = chatListStore(state => state.sortList);

    useEffect(() => {
        console.log("use effect called");
        if (data?.response) {
            setMessages(data.response);
        }
    }, [data]);

    async function sendMessage(input: string) {
        setLoading(true);
        const newMessages: Message[] = [
            ...messages,
            { id: crypto.randomUUID(), role: "user", content: input },
        ];

        setMessages(newMessages);

        const res = await fetch("/api/chat2", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: input,
                sessionId: id,
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
        setLoading(false);
        await list();
    }

    return (
        <>
            <Conversation className="w-full relative h-120">
                {isLoading ? (
                    <Loader />
                ) : (
                    <>
                        <ConversationContent>
                            {messages.map((message, index) => (
                                <Message
                                    from={message.role}
                                    key={index}
                                    className="flex items-center"
                                >
                                    <MessageContent role={message.role}>
                                        {message.role === "assistant" ? (
                                            <Response>
                                                {message.content}
                                            </Response>
                                        ) : (
                                            <>{message.content}</>
                                        )}
                                    </MessageContent>
                                    {message.role === "user" && (
                                        <MessageAvatar
                                            src={userData?.imageUrl}
                                            className=""
                                        />
                                    )}
                                </Message>
                            ))}

                            {loading && <Loader />}
                        </ConversationContent>

                        <ConversationScrollButton />
                    </>
                )}
            </Conversation>

            <PromptInput
                onSubmit={(e) => {
                    e.preventDefault();
                    if (input.trim()) {
                        sendMessage(input);
                        setInput("");
                    }
                }}
                className="mt-2 w-full max-w-4xl mx-auto relative"
            >
                <PromptInputTextarea
                    value={input}
                    onChange={(e: any) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="pr-12"
                />

                <PromptInputToolbar className="absolute bottom-1 right-1">
                    <PromptInputSubmit disabled={!input.trim()} />
                </PromptInputToolbar>
            </PromptInput>
        </>
    );
}
