import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import redis from "@/db/redis";

export async function DELETE(req: NextRequest) {
    const { chatId } = await req.json();
    const user = await currentUser();

    if (!chatId || !user) {
        return NextResponse.json(
            { error: "Missing userId or chatId" },
            { status: 400 }
        );
    }

    const items = await redis.lrange(`${user.id}`, 0, -1);

    const target = items.find((item) => {
        try {
            const parsed = JSON.parse(item);
            return parsed.sessionId === chatId;
        } catch {
            return false;
        }
    });

    // Delete the chat from Redis
    await redis.lrem(`${user.id}`, 1, target as string);
    await redis.del(`${chatId}`);

    return NextResponse.json({ message: "Chat deleted" });
}
