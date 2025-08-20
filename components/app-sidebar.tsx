import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import ListChat from "./listChat";
import NewChat from "./newChat";
import { getClerkUser } from "@/lib/auth/auth";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Logo from "@/public/ChatGPT-Logo.png"

export async function AppSidebar() {
    const user = await getClerkUser();
    return (
        <Sidebar>
            <SidebarHeader className="mt-2">
                <Image src={Logo.src} width={60} height={60} alt="Logo"/>
            </SidebarHeader>
            <SidebarContent className="py-4 flex flex-col gap-6">
                <SidebarGroup>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <NewChat />
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>

                <SidebarGroup className="flex-1 overflow-y-auto">
                    <ListChat />
                </SidebarGroup>

                <SidebarFooter>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <div className="flex items-center gap-2">
                                <UserButton/>
                                <div className="flex flex-col">
                                    <p>{user.firstName} {user.lastName}</p>
                                    <p>{user.email}</p>
                                </div>
                            </div>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
            </SidebarContent>
        </Sidebar>
    );
}
