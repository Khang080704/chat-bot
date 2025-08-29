"use client";
import { useClerk, UserButton, useUser } from "@clerk/nextjs";
import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ChevronDown, ChevronUp, LogOut, Settings } from "lucide-react";
import { useSidebar } from "./ui/sidebar";

export default function UserProfileManagement() {
    const user = useUser();
    const { signOut, openUserProfile } = useClerk();
    const { isMobile, state } = useSidebar();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {state === "expanded" ? (
                    <div className="flex items-center justify-between gap-1 cursor-pointer p-2 hover:bg-gray-200 hover:rounded-2xl">
                        <img
                            src={user.user?.imageUrl}
                            className="w-10 rounded-full"
                        />
                        <div className="flex flex-col">
                            <p>{user.user?.fullName}</p>
                            <p>{user.user?.emailAddresses[0].emailAddress}</p>
                        </div>
                        <div className="flex flex-col">
                            <ChevronUp size={16} />
                            <ChevronDown size={16} />
                        </div>
                    </div>
                ) : (
                    <UserButton/>
                )}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                    <div className="flex items-center gap-2 p-2">
                        <img
                            src={user.user?.imageUrl}
                            className="w-10 rounded-full"
                        />
                        <div className="flex flex-col">
                            <p>{user.user?.fullName}</p>
                            <p>{user.user?.emailAddresses[0].emailAddress}</p>
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onSelect={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            openUserProfile();
                        }}
                    >
                        <div className="flex items-center gap-2 p-2 text-[20px] cursor-pointer">
                            <span>
                                {" "}
                                <Settings />
                            </span>{" "}
                            Manage Profile
                        </div>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        className="cursor-pointer"
                        onSelect={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            signOut({ redirectUrl: "/" });
                        }}
                    >
                        <div className="flex items-center gap-2 p-2 text-[20px]">
                            <span>
                                {" "}
                                <LogOut />
                            </span>{" "}
                            Logout
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
