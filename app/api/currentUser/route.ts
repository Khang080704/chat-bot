import { getClerkUser } from "@/lib/auth/auth";
import { NextResponse } from "next/dist/server/web/spec-extension/response";

export async function GET() {
    const user = await getClerkUser();
    return NextResponse.json(user);
}