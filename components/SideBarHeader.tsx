"use client";
import Image from "next/image";
import { SidebarTrigger, useSidebar } from "./ui/sidebar";
import Logo from "@/public/ChatGPT-Logo.png";
import { redirect } from "next/navigation";

export default function SideBarHeaderCustom() {
    const { isMobile, state, setOpenMobile } = useSidebar();

    return state === "collapsed" && !isMobile ? (
        <SidebarTrigger />
    ) : (
        <div className="flex items-center justify-between">
            <div
                onClick={() => {
                    setOpenMobile(false);
                    redirect("/");
                }}
            >
                <Image
                    src={Logo.src}
                    width={60}
                    height={60}
                    alt="Logo"
                    className="px-0.5 py-2.5 rounded-2xl cursor-pointer hover:bg-gray-200"
                />
            </div>

            <SidebarTrigger />
        </div>
    );
}
