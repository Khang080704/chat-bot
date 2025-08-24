"use client";

import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Trash, Edit, Share } from "lucide-react";
import { redirect } from "next/navigation";
import { chatListStore } from "@/app/store/list";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useContext } from "react";
import { RenameContext } from "@/context/renameContext";

export default function ThreeDotsMenu({ chatId }: { chatId: string }) {
    const [open, setOpen] = useState(false);
    const rename = useContext(RenameContext);
    

    async function handleDelete(e: any) {
        e.stopPropagation();
        e.preventDefault()

        const res = await fetch("/api/delete", {
            method: "DELETE",
            body: JSON.stringify({ chatId }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const message = await res.json();
        console.log(message);
        chatListStore.getState().removeList(chatId);
        redirect("/");
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                    >
                        <MoreHorizontal className="h-5 w-5" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40" onClick={(e) => e.stopPropagation()}>
                    <DropdownMenuLabel>Option</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={(e) => {
                            e.stopPropagation();
                            rename?.setIsRenaming(true)
                        }}
                        className="p-3"
                    >
                        <span>
                            <Edit className="inline-block mr-2" />
                        </span>{" "}
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => alert("Share")}
                        className="p-3"
                    >
                        <span>
                            <Share className="inline-block mr-2" />
                        </span>{" "}
                        Share
                    </DropdownMenuItem>

                    <Dialog>
                        <DialogTrigger asChild>
                            <DropdownMenuItem
                                onSelect={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation()
                                }}
                                className="p-3 text-red-500 w-full"
                            >
                                <span>
                                    <Trash className="inline-block mr-2 text-red-500" />
                                </span>
                                <span className="text-red-500">Delete</span>
                            </DropdownMenuItem>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className="flex justify-start text-2xl">Delete Chat?</DialogTitle>
                                <DialogDescription className="text-md text-black flex justify-start">
                                    This will delete {chatId}.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter className="flex justify-end gap-2">
                                
                                <DialogClose asChild>
                                    <Button variant="outline" className="hover:cursor-pointer">
                                        Cancel
                                    </Button>
                                </DialogClose>
                                <Button variant="destructive" className="hover:cursor-pointer" onClick={(e) => handleDelete(e)}>
                                    Delete
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
