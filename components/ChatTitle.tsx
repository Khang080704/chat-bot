'use client'
import { redirect } from "next/navigation";
import ThreeDotsMenu from "./ThreeDots";
import { useSidebar } from "./ui/sidebar";

export default function ChatTitle({chatkey}: any) {
    const {setOpenMobile} = useSidebar()

    const getChat = () => {
        setOpenMobile(false)
        redirect(`/c/${chatkey}`)
    };

    return (
        <div onClick={getChat} className="hover:bg-gray-200 p-3 rounded-2xl group flex items-center justify-between cursor-pointer">
            <h2>{chatkey}</h2>
            <ThreeDotsMenu chatId={chatkey} />
        </div>
    )
}