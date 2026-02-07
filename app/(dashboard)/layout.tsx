import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { currentUser } from "@clerk/nextjs/server";
import FetchChatList from "@/components/fetchChatList";
import connectToMongoDB from "@/db/mongodb";
import { User } from "@/models";

export default async function DashboardLayout({children}: {children: React.ReactNode}) {
    const user = await currentUser()
    if(user) {
        await connectToMongoDB();
        const existingUser = await User.findOne({ userId: user.id });
        if (!existingUser) {
            await User.create({ userId: user.id });
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
