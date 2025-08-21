"use client";

import { NotebookPenIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { useSidebar } from "./ui/sidebar";

export default function NewChat() {
    const { state } = useSidebar();

    const handleNewChat = () => {
        redirect("/");
    };

    return state === "expanded" ? (
        <div
            className="flex cursor-pointer items-center gap-2 text-md hover:bg-gray-200 p-3 rounded-2xl"
            onClick={handleNewChat}
        >
            <NotebookPenIcon /> New Chat
        </div>
    ) : (
        <div className="hover:bg-gray-200 rounded-2xl flex items-center justify-center p-1">
            <NotebookPenIcon/>
        </div>
    );
}
