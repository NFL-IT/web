import db from "@/db";
import { usersTable } from "@/db/schema";
import { argon2id, hash } from "argon2";
import { z } from "zod";
import { createToken } from "@/app/utils/JWTUtils";

const schema = z.object({
    username: z.string(),
    password: z.string(),
    email: z.string().email(),
    type: z.enum(["admin", "user"]),
});

export const POST = async (req: Request) => {
    try {
        const json = await req.json();

        const body = await schema.safeParseAsync(json);

        if (!body.success) {
            return Response.json({
                success: false,
                error: body.error
            }, { status: 400 })
        }

        const user = await db.insert(usersTable).values({
            username: body.data.username,
            password: await hash(body.data.password, {
                type: argon2id,
                parallelism: 8,
                memoryCost: 2 ** 16,
                timeCost: 4,
            }),
            email: body.data.email,
            type: body.data.type,
        }).returning({ user_id: usersTable.id });
        
        const token = await createToken({
            id: user[0].user_id,
            email: body.data.email,
            username: body.data.username,
            type: body.data.type,
        })

        return Response.json({
            success: true,
            message: "User/client created successfully",
            token,
        }, { status: 201 });
    } catch(e) {
        console.error(e);
        return Response.json({
            success: false,
            message: "Error creating user/client"
        }, { status: 500 });
    }
}