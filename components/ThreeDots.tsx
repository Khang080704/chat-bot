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

export default function ThreeDotsMenu({chatId}: {chatId: string}) {
    async function handleDelete(e:any) {
        e.stopPropagation();

        const res = await fetch('/api/delete', {
            method: 'DELETE',
            body: JSON.stringify({chatId }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const message = await res.json();
        console.log(message);
        chatListStore.getState().removeList(chatId);
        redirect('/')
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                    <MoreHorizontal className="h-5 w-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuLabel>Option</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => alert("Edit")} className="p-3">
                    <span><Edit className="inline-block mr-2" /></span> Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => alert("Share")} className="p-3">
                    <span><Share className="inline-block mr-2" /></span> Share
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => handleDelete(e)} className="p-3 text-red-500">
                    <span><Trash className="inline-block mr-2 text-red-500" /></span> 
                    <span className="text-red-500">Delete</span> 
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
