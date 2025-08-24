import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import redis from "@/db/redis";

export async function PATCH(req: NextRequest) {
    const user = await currentUser();
    const {sessionId, newTitle} = await req.json();

    const raw = await redis.hget(`user:${user?.id}:sessions`, sessionId);
    const session = JSON.parse(raw as string);
    session.title = newTitle;
    await redis.hset(`user:${user?.id}:sessions`, sessionId, JSON.stringify(session));

    return NextResponse.json({message: 'Update success'}, {status: 200})

}