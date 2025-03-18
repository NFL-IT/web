import { verifyToken } from "@app/utils/JWTUtils";
import db from "@/db/index";
import { cookies } from "next/headers"

export const GET = async () => {
    const cookieManager = await cookies();
    const token = cookieManager.get('token');

    if (!token) {
        return Response.json({ message: "Not logged in" }, { status: 401 });
    }

    const session = await verifyToken(token.value);

    if (!session || session.type !== 'admin') {
        return Response.json({ message: "Invalid token" }, { status: 401 });
    }

    const reports = await db.query.reportsTable.findMany();

    return Response.json(reports);

    
}