import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import redis from "@/db/redis";
import { currentUser } from "@clerk/nextjs/server";
import FetchChatList from "@/components/fetchChatList";

export default async function DashboardLayout({children}: {children: React.ReactNode}) {
    const user = await currentUser()
    if(user) {
        const exists = await redis.sismember("users", user.id);
        if (!exists) {
            await redis.sadd("users", user.id);
        }
    }

    return (
        <SidebarProvider>
            <SidebarTrigger/>
            <AppSidebar />
            <main className="w-full">{children}</main>
        </SidebarProvider>
    );
}
