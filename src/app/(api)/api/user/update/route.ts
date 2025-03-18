import db from "@/db";
import { usersTable } from "@/db/schema";
import { argon2id, hash } from "argon2";
import { eq } from "drizzle-orm";
import { z } from "zod";

const schema = z.object({
    id: z.string(),
    username: z.string().optional(),
    password: z.string().optional(),
    email: z.string().email().optional(),
    type: z.enum(["admin", "user"]).optional(),
});

export const PATCH = async (req: Request) => {
    try {
        const json = await req.json();
        const parsed = await schema.safeParseAsync(json);

        if (!parsed.success) {
            return Response.json(
                {
                    success: false,
                    error: parsed.error,
                },
                { status: 400 }
            );
        }

        const { id, username, password, email, type } = parsed.data;
        const updateFields: { username?: string; email?: string; type?: "admin" | "user"; password?: string } = {};

        if (username) {
            updateFields.username = username.trim();
        }

        if (email) {
            updateFields.email = email.trim();
        }

        if (type) {
            updateFields.type = type.trim() as "admin" | "user";
        }

        if (password) {
            updateFields.password = await hash(password.trim(), {
                type: argon2id,
                parallelism: 8,
                memoryCost: 2 ** 16,
                timeCost: 4,
            });
        }

        // Update user by its id.
        const result = await db
            .update(usersTable)
            .set(updateFields)
            .where(eq(usersTable.id, id))
            .returning({ user_id: usersTable.id, username: usersTable.username, email: usersTable.email, type: usersTable.type });

        if (result.length === 0) {
            return Response.json(
                {
                    success: false,
                    message: "User not found",
                },
                { status: 404 }
            );
        }

        return Response.json(
            {
                success: true,
                message: "User updated successfully",
                user: result[0],
            },
            { status: 200 }
        );
    } catch (e) {
        console.error(e);
        return Response.json(
            {
                success: false,
                message: "Error updating user",
            },
            { status: 500 }
        );
    }
};