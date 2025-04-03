import db from "@/db";
import { usersTable } from "@/db/schema";
import { argon2id, hash } from "argon2";
import { eq } from "drizzle-orm";

export const GET = async () => {
    // Check if an admin exists in the db
    const adminCount = await db.query.usersTable.findFirst({
        columns: {
            id: true,
        },
        where: eq(usersTable.type, "admin"),
    });
    if (adminCount?.id) {
        return Response.json({ message: "Admin already exists" }, { status: 400 });
    }
    return Response.json({ message: "No admin found" }, { status: 200 });
}

export const POST = async (req: Request) => {
    // Check if an admin exists in the db
    const adminCount = await db.query.usersTable.findFirst({
        columns: {
            id: true,
        },
        where: eq(usersTable.type, "admin"),
    });
    if (adminCount?.id) {
        return Response.json({ message: "Admin already exists" }, { status: 400 });
    }
    try {
        const json = await req.json();
        const { email, username, password } = json;

        if (!email || !username || !password) {
            return Response.json({ message: "Invalid request" }, { status: 400 });
        }

        const hashedPassword = await hash(password, {
            type: argon2id,
            parallelism: 8,
            memoryCost: 2 ** 16,
            timeCost: 4,
        });
        await db.insert(usersTable).values({
            email,
            username,
            password: hashedPassword,
            type: "admin",
        });

        return Response.json({ message: "User created successfully" }, { status: 200 });
    } catch (e) {
        console.error(e);
        return Response.json({ message: "An error occurred" }, { status: 500 });
    }
}