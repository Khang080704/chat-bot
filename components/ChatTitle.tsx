"use client";
import { redirect, useParams } from "next/navigation";
import ThreeDotsMenu from "./ThreeDots";
import { useSidebar } from "./ui/sidebar";
import ReactMarkdown from "react-markdown";
import { RenameContext, Rename } from "@/context/renameContext";
import { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";

import clsx from 'clsx'
import style from "./style.module.css"

export default function ChatTitle({
    chatkey,
    title,
}: {
    chatkey: string;
    title: string;
}) {
    const { setOpenMobile, isMobile, state } = useSidebar();
    const [isRenaming, setIsRenaming] = useState(false);
    const [newTitle, setNewTitle] = useState(title);
    const inputRef = useRef<HTMLInputElement>(null);
    const { id } = useParams();
    const titleStyle = clsx(style.title);

    const getChat = () => {
        setOpenMobile(false);
        redirect(`/c/${chatkey}`);
    };

    const changeTitle = async () => {
        setIsRenaming(false);
        const res = await fetch("/api/update", {
            method: "PATCH",
            body: JSON.stringify({ sessionId: chatkey, newTitle }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const message = await res.json();
        console.log(message);
        
    };

    // useEffect(() => {
    //     if (inputRef.current) {
    //         inputRef.current.focus();
    //         inputRef.current.select();
    //     }
    // }, []);

    return (
        <RenameContext.Provider value={{ isRenaming, setIsRenaming }}>
            <div
                onClick={getChat}
                className={`hover:bg-gray-200 p-3 rounded-2xl group flex items-center justify-between cursor-pointer ${id === chatkey ? "bg-gray-200" : ""}`}
            >
                {isRenaming ? (
                    <Input
                        type="text"
                        value={newTitle}
                        onChange={(e) => {
                            setNewTitle(e.target.value)
                        }}
                        onClick={(e) => e.stopPropagation()}
                        onBlur={changeTitle}
                        autoFocus
                        ref={inputRef}
                    />
                ) : (
                    <p className={titleStyle}>{(title !== newTitle) ? newTitle : title}</p> 
                )}
                <ThreeDotsMenu chatId={chatkey} />
            </div>
        </RenameContext.Provider>
    );
}
