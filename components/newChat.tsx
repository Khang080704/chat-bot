"use client";

import { NotebookIcon } from "lucide-react";
import { redirect } from "next/navigation";

export default function NewChat() {
    const handleNewChat = () => {
        redirect('/')
    };

    return (
        <div className="flex cursor-pointer align-baseline" onClick={handleNewChat}>
            <NotebookIcon /> New Chat
        </div>
    );
}
