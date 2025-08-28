"use client";
import { useClerk, useUser } from "@clerk/nextjs";
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
import { LogOut, Settings } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { UserProfile } from "@clerk/nextjs";

function Profile() {
    return (
        <div className="h-20 w-[70%] mx-auto">
            <UserProfile />
        </div>
    );
}

export default function UserProfileManagement() {
    const user = useUser();
    const [open, setOpen] = useState();
    const { signOut } = useClerk();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-200 hover:rounded-2xl">
                    <img
                        src={user.user?.imageUrl}
                        className="w-10 rounded-full"
                    />
                    <div className="flex flex-col">
                        <p>{user.user?.fullName}</p>
                        <p>{user.user?.emailAddresses[0].emailAddress}</p>
                    </div>
                </div>
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
                    <Dialog>
                        <DialogTrigger asChild>
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onSelect={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
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
                        </DialogTrigger>
                        <DialogContent>
                            <DialogTitle>Manage Account</DialogTitle>
                            <Profile />
                        </DialogContent>
                    </Dialog>

                    <DropdownMenuItem className="cursor-pointer">
                        <div
                            className="flex items-center gap-2 p-2 text-[20px]"
                            onClick={() => signOut({ redirectUrl: "/" })}
                        >
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
