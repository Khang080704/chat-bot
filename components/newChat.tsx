"use client";

import { Edit } from "lucide-react";
import { redirect } from "next/navigation";
import { useSidebar } from "./ui/sidebar";

export default function NewChat() {
    const { state, isMobile, setOpenMobile } = useSidebar();

    const handleNewChat = () => {
        setOpenMobile(false);
        redirect("/");
    };

    return state === "expanded" && !isMobile ? (
        <div
            className="flex cursor-pointer items-center gap-2 text-md hover:bg-gray-200 p-3 rounded-2xl"
            onClick={handleNewChat}
        >
            <Edit />
            New Chat
        </div>
    ) : state === "expanded" && isMobile ? (
        <div
            className="flex cursor-pointer items-center gap-2 text-md hover:bg-gray-200 p-3 rounded-2xl"
            onClick={handleNewChat}
        >
            <Edit />
            New Chat
        </div>
    ) : (
        <div
            className="hover:bg-gray-200 rounded-2xl flex items-center justify-center p-1"
            onClick={handleNewChat}
        >
            <Edit />
        </div>
    );
}
