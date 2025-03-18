import { verifyToken } from "@/app/utils/JWTUtils";
import db from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

export const GET = async () => {
    const cookieManager = await cookies();

    const token = cookieManager.get("token");
    if (!token) {
        return Response.json({ error: "No token found" }, { status: 401 });
    }

    const data = await verifyToken(token.value);

    if (!data || data.type !== "admin") {
        return Response.json({ error: "Invalid token" }, { status: 401 });
    }

    return Response.json(await db.query.usersTable.findMany({
        where: eq(usersTable.type, "admin"),
        columns: {
            id: true,
            username: true,
            email: true,
            type: true,
            created_at: true,
        }
    }));
}