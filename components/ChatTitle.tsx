'use client'
import { redirect } from "next/navigation";

export default function ChatTitle({chatkey}: any) {
    const getChat = () => {
        redirect(`/c/${chatkey}`)
    };

    return (
        <div onClick={getChat}>
            <h2>Chat Title: {chatkey}</h2>
        </div>
    )
}