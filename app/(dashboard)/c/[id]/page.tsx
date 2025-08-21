"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";

type Message = {
    id: string;
    role: "user" | "assistant";
    content: string;
};

export default function Page() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const id = useParams().id as string;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            const res = await fetch("/api/chatDetail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    sessionId: id,
                }),
            });
            const data = await res.json();
            setMessages(data.respone);
        })();
    }, []);

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
                content: data.output,
            },
        ]);
        setLoading(false);
    }

    return (
        <div className="w-full px-5 mx-auto flex flex-col h-screen py-8">
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
                            className={`px-4 py-2 rounded-lg break-words ${
                                message.role === "user"
                                    ? "bg-blue-500 text-white max-w-xs"
                                    : "bg-gray-200 text-gray-900"
                            }`}
                        >
                            {message.role === "assistant" ? (
                                <ReactMarkdown>{message.content}</ReactMarkdown>
                            ) : (
                                <>{message.content}</>
                            )}
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
                <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1"
                />
                <Button type="submit" className="h-10 px-6">
                    Send
                </Button>
            </form>
        </div>
    );
}
