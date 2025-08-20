"use client";

import { NotebookIcon, NotebookPenIcon } from "lucide-react";
import { redirect } from "next/navigation";

export default function NewChat() {
    const handleNewChat = () => {
        redirect('/')
    };

    return (
        <div className="flex cursor-pointer items-center gap-2 text-md hover:bg-gray-200 p-3 rounded-2xl" onClick={handleNewChat}>
            <NotebookPenIcon /> New Chat
        </div>
    );
}
