import { createToken, verifyToken } from "@/app/utils/JWTUtils";
import db from "@/db";
import { usersTable } from "@/db/schema";
import { verify } from "argon2";
import { and, eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { z } from "zod";

const schema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export const POST = async (req: Request) => {
    try {
        const cookieManager = await cookies();
        const json = await req.json();

        const validatedJson = await schema.safeParseAsync(json);

        if (!validatedJson.success) {
            return Response.json({ message: "Invalid request" }, { status: 400 });
        }

        const { data } = validatedJson;

        const client = await db.query.usersTable.findFirst({
            where: and(
                eq(usersTable.email, data.email),
                eq(usersTable.type, "user"),
            ),
            columns: {
                id: true,
                password: true,
                username: true,
            },
        });

        if (!client) {
            return Response.json({ message: "Invalid email or password" }, { status: 400 });
        }

        if (!await verify(client.password, data.password)) {
            return Response.json({ message: "Invalid email or password" }, { status: 400 });
        }

        const clientCookie = await createToken({
            id: client.id,
            email: data.email,
            type: "user",
            username: client.username,
        });

        cookieManager.set("token", clientCookie);
        return Response.json({ success: true }, { status: 200 });

    } catch (e) {
        console.error(e);
        return Response.json({ message: "An error occurred" }, { status: 500 });
    }
}