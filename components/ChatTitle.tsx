'use client'
import { redirect } from "next/navigation";
import ThreeDotsMenu from "./ThreeDots";
import { useSidebar } from "./ui/sidebar";
import ReactMarkdown from 'react-markdown'

export default function ChatTitle({chatkey, title}: {chatkey: string, title: string}) {
    const {setOpenMobile} = useSidebar()

    const getChat = () => {
        setOpenMobile(false)
        redirect(`/c/${chatkey}`)
    };

    return (
        <div onClick={getChat} className="hover:bg-gray-200 p-3 rounded-2xl group flex items-center justify-between cursor-pointer">
            <ReactMarkdown>
                {title}
            </ReactMarkdown>
            <ThreeDotsMenu chatId={chatkey} />
        </div>
    )
}