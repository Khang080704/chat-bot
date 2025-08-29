import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import ListChat from "./listChat";
import NewChat from "./newChat";
import UserProfile from "./UserProfile";
import SideBarHeaderCustom from "./SideBarHeader";
import { getAllListKeys } from "@/lib/list";

export async function AppSidebar() {
    const listChat = await getAllListKeys();

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="mt-2">
                <SideBarHeaderCustom/>
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
                    <ListChat list={listChat}/>
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
