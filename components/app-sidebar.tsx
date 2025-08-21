"use client";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import ListChat from "./listChat";
import NewChat from "./newChat";
import { getClerkUser } from "@/lib/auth/auth";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { useSidebar } from "@/components/ui/sidebar";
import Logo from "@/public/ChatGPT-Logo.png";

export function AppSidebar() {
    //const user = await getClerkUser();
    const { isMobile, state } = useSidebar();

    if (isMobile) {
        return (
            <Sidebar>
                <SidebarHeader className="mt-2">
                    <div className="flex items-center justify-between">
                        <Image
                            src={Logo.src}
                            width={60}
                            height={60}
                            alt="Logo"
                        />
                        <SidebarTrigger />
                    </div>
                </SidebarHeader>
                <SidebarContent className="py-4 flex flex-col gap-6">
                    <SidebarGroup>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <NewChat />
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroup>

                    {state == "expanded" && (
                        <SidebarGroup className="flex-1 overflow-y-auto">
                            <ListChat />
                        </SidebarGroup>
                    )}

                    <SidebarFooter>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <div className="flex items-center gap-2">
                                    <UserButton />
                                    <div className="flex flex-col">
                                        {/* <p>{user.firstName} {user.lastName}</p>
                                    <p>{user.email}</p> */}
                                    </div>
                                </div>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarFooter>
                </SidebarContent>
            </Sidebar>
        );
    }

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="mt-2">
                {state === "collapsed" && !isMobile ? (
                    <SidebarTrigger />
                ) : (
                    <div className="flex items-center justify-between">
                        <Image
                            src={Logo.src}
                            width={60}
                            height={60}
                            alt="Logo"
                        />
                        <SidebarTrigger />
                    </div>
                )}
            </SidebarHeader>
            <SidebarContent className="py-4 flex flex-col gap-6">
                <SidebarGroup>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <NewChat />
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>

                {state == "expanded" && (
                    <SidebarGroup className="flex-1 overflow-y-auto">
                        <ListChat />
                    </SidebarGroup>
                )}

                <SidebarFooter>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <div className="flex items-center gap-2">
                                <UserButton />
                                <div className="flex flex-col">
                                    {/* <p>{user.firstName} {user.lastName}</p>
                                    <p>{user.email}</p> */}
                                </div>
                            </div>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
            </SidebarContent>
        </Sidebar>
    );
}
