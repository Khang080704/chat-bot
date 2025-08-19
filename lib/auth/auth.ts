import { currentUser } from "@clerk/nextjs/server";

export async function getClerkUser() {
    const user = await currentUser();
    if (!user) throw new Error("Not authenticated");

    return {
        id: user.id,
        email: user.emailAddresses[0]?.emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
        imageUrl: user.imageUrl,
    };
}

