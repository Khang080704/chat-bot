import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import redis from "@/db/redis";

export async function PATCH(req: NextRequest) {
    const user = await currentUser();
    const {sessionId, newTitle} = await req.json();
    const list = await redis.lrange(`${user?.id}`, 0, -1)

    for (let i = 0; i < list.length; i++) {
        const item = JSON.parse(list[i]);
        if(item.sessionId == sessionId) {
            item.title = newTitle;
            await redis.lset(`${user?.id}`, i, JSON.stringify(item));
            return NextResponse.json({message: 'Title updated successfully'}, {status: 200})
        }
    }

    return NextResponse.json({message: 'Update fail'}, {status: 500})

}