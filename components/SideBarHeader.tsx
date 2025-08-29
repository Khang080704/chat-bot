"use client";
import Image from "next/image";
import { SidebarTrigger, useSidebar } from "./ui/sidebar";
import Logo from "@/public/ChatGPT-Logo.png";

export default function SideBarHeaderCustom() {
    const { isMobile, state } = useSidebar();

    return state === "collapsed" && !isMobile ? (
        <SidebarTrigger />
    ) : (
        <div className="flex items-center justify-between">
            <Image src={Logo.src} width={60} height={60} alt="Logo" />
            <SidebarTrigger />
        </div>
    );
}
