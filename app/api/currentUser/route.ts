import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/dist/server/web/spec-extension/response";

export async function GET() {
    const user = await currentUser();
    return NextResponse.json(user);
}