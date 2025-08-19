import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
} from "@/components/ui/sidebar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ChevronUp, NotebookIcon, User2 } from "lucide-react";
import ListChat from "./listChat";
import NewChat from "./newChat";
import { getClerkUser } from "@/lib/auth/auth";
import { UserButton } from "@clerk/nextjs";

export async function AppSidebar() {
    const user = await getClerkUser();
    return (
        <Sidebar>
            <SidebarHeader />
            <SidebarContent className="px-5 py-4 flex flex-col gap-6">
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
                                <UserButton />
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
