"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { chatListStore } from "@/app/store/list";
import { ArrowUp } from "lucide-react";

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
        chatListStore.getState().addList({sessionId: `${sessionId}`, title: data.chatTitle});
        setLoading(false);
        router.push(`/c/${sessionId}`);
    }

    return (
        <div className="w-full sm:px-5 mx-auto flex flex-col h-screen py-6">
            <div className="flex-1 overflow-y-auto bg-white rounded-lg shadow p-6 mb-4 space-y-4">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${
                            message.role === "user"
                                ? "justify-end"
                                : "justify-start"
                        }`}
                    >
                        <div
                            className={`px-4 py-2 rounded-lg max-w-xs break-words ${
                                message.role === "user"
                                    ? "bg-blue-500 text-white max-w-[200px] sm:max-w-sm lg:max-w-lg"
                                    : "bg-gray-200 text-gray-900"
                            }`}
                        >
                            {message.content}
                        </div>
                    </div>
                ))}
                {loading && (
                    <span className="inline-block bg-gray-300 px-3 py-2 rounded-xl">
                        <span className="animate-bounce inline-block w-2 h-2 bg-gray-400 rounded-full mr-1"></span>
                        <span
                            className="animate-bounce inline-block w-2 h-2 bg-gray-400 rounded-full mr-1"
                            style={{ animationDelay: "0.1s" }}
                        ></span>
                        <span
                            className="animate-bounce inline-block w-2 h-2 bg-gray-400 rounded-full"
                            style={{ animationDelay: "0.2s" }}
                        ></span>
                    </span>
                )}
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (input.trim()) {
                        sendMessage(input);
                        setInput("");
                    }
                }}
                className="flex items-center gap-2"
            >
                <div className="shadow rounded-3xl py-3 px-5 flex w-full items-center justify-center">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full border-none outline-none p-2"
                        placeholder="Type your message..."
                        disabled={loading}
                    />
                    <Button type="submit" className="h-10 px-6 rounded-3xl" disabled={loading || input==''}>
                        <ArrowUp className="font-bold"/>
                    </Button>
                </div>
            </form>
        </div>
    );
}
