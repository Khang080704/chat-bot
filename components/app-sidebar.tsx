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
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useSidebar } from "@/components/ui/sidebar";
import Logo from "@/public/ChatGPT-Logo.png";
import UserProfile from "./UserProfile";

export function AppSidebar() {
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

                    <SidebarGroup className="flex-1 overflow-y-auto">
                        <ListChat />
                    </SidebarGroup>

                    <SidebarFooter>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <UserProfile/>
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

                <SidebarGroup className="flex-1 overflow-y-auto">
                    <ListChat />
                </SidebarGroup>

                <SidebarFooter>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <UserProfile/>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
            </SidebarContent>
        </Sidebar>
    );
}
