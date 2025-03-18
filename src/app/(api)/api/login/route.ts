import { createToken, verifyToken } from "@app/utils/JWTUtils";
import db from "@/db/index";
import { usersTable } from "@/db/schema";
import { argon2id, hash, verify } from "argon2";
import { and, eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { z } from "zod";

const schema = z.object({
    email: z.string().email(),
    password: z.string(),
})

export const GET = async () => {
    try {
        const user = await db.insert(usersTable).values({
            email: "test@mail.com",
            password: await hash("test", {
                type: argon2id,
                parallelism: 8,
                memoryCost: 2 ** 16,
                timeCost: 4,
            }),
            username: "TestingUser",
            type: "admin",
        }).returning({ id: usersTable.id }).execute();

        const userCookie = await createToken({
            id: user[0].id,
            email: "test@mail.com",
            type: "admin",
            username: "TestingUser",
        });

        const client = await db.insert(usersTable).values({
            email: "client@mail.com",
            password: await hash("client", {
                type: argon2id,
                parallelism: 8,
                memoryCost: 2 ** 16,
                timeCost: 4,
            }),
            username: "TestingClient",
            type: "user",
        }).returning({ id: usersTable.id }).execute();

        const clientCookie = await createToken({
            id: client[0].id,
            email: "client@mail.com",
            type: "user",
            username: "TestingClient",
        });

        return Response.json({ userCookie, clientCookie });
    } catch {
        // Users already exist

        const user = await db.query.usersTable.findFirst({
            where: and(
                eq(usersTable.email, "test@mail.com"),
                eq(usersTable.type, "admin"),
            ),
            columns: {
                id: true,
                username: true,
                email: true,
            },
        });

        if (!user) {
            return Response.json({ message: "The user doesn't exist" }, { status: 404 });
        }

        const userCookie = await createToken({
            id: user.id,
            email: user?.email,
            type: "admin",
            username: user.username,
        })

        const client = await db.query.usersTable.findFirst({
            where: and(
                eq(usersTable.email, "client@mail.com"),
                eq(usersTable.type, "user"),
            ),
            columns: {
                id: true,
                username: true,
                email: true,
            },
        });

        if (!client) {
            return Response.json({ message: "The client doesn't exist" }, { status: 404 });
        }

        const clientCookie = await createToken({
            id: client.id,
            email: client?.email,
            type: "user",
            username: client.username,
        })

        return Response.json({ userCookie, clientCookie });

    }
}

export const POST = async (req: Request) => {
    try {
        const Cookies = await cookies();
        const token = Cookies.get("token");

        if (token && await verifyToken(token.value) !== null) {
            return Response.json({ message: "Already logged in" }, { status: 400 });
        }
        const json = await req.json();

        const validatedJson = await schema.safeParseAsync(json);

        if (!validatedJson.success) {
            return Response.json({ message: "Invalid request" }, { status: 400 });
        }
        const { data } = validatedJson;

        const user = await db.query.usersTable.findFirst({
            where: and(
                eq(usersTable.email, data.email),
                eq(usersTable.type, "admin"),
            ),
            columns: {
                id: true,
                password: true,
                username: true,
            },
        });

        if (!user) {
            return Response.json({ message: "Invalid email or password" }, { status: 400 });
        }

        if (!await verify(user.password, data.password)) {
            return Response.json({ message: "Invalid email or password" }, { status: 400 });
        }

        Cookies.set("token", await createToken({
            id: user.id,
            email: data.email,
            type: "admin",
            username: user.username,
        }));

        return Response.json({ message: "Logged in" }, { status: 200 });
    } catch {
        return Response.json({ message: "Invalid request" }, { status: 400 });
    }

}