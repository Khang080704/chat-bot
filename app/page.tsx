"use client";

import { use, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Message = {
    id: string;
    role: "user" | "assistant";
    content: string;
};

export default function Page() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");

    async function sendMessage(input: string) {
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
                his: newMessages,
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
    }

    return (
        <div className="max-w-xl mx-auto flex flex-col h-screen py-8">
            <div className="flex-1 overflow-y-auto bg-white rounded-lg shadow p-6 mb-4 space-y-4">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${
                            message.role === "user"
                                ? "justify-end"
                                : "justify-start"
                        }`}
                    >
                        <div
                            className={`px-4 py-2 rounded-lg max-w-xs break-words ${
                                message.role === "user"
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-gray-900"
                            }`}
                        >
                            {message.content}
                        </div>
                    </div>
                ))}
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
