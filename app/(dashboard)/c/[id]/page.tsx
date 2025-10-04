import { chatSession } from "@/redux/features/chatList/chatListSliceType";
import ChatConversation from "./_component/ChatSession";
import { Metadata } from "next";
import { getAllListKeys } from "@/lib/list";

const getChatTitle = (sessionId: string, chatList: any) => {
    const titleResult = chatList.find(
        (chat: any) => chat.sessionId === sessionId
    )?.title;
    return titleResult || "New Chat";
};

export async function generateMetadata({ params }: any): Promise<Metadata> {
    const list = await getAllListKeys();
    const { id } = await params;
    const chatTitle = getChatTitle(id, list);

    return {
        title: chatTitle,
        description: "Chat detail page",
    };
}

export default function Page({ params }: any) {
    return <ChatConversation />;
}
