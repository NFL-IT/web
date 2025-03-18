import { verifyToken } from "@/app/utils/JWTUtils";
import db from "@/db";
import { reportsTable } from "@/db/schema";
import { cookies } from "next/headers";
import { z } from "zod"

const portResultSchema = z.record(z.enum(["open", "closed"])).refine((value) => {
    return Object.keys(value).every((key) => {
        const port = Number(key);
        return Number.isInteger(port) && port > 0 && port < 65536;
    });
}, {
    message: "Invalid port number",
});

const deviceResultSchema = z.array(
    z.object({
        ip: z.string(),
        mac: z.string()
    })
);

const schema = z.discriminatedUnion("type", [
    z.object({
        interface: z.string(),
        ip_address: z.string(),
        mac_address: z.string(),
        type: z.literal("port"),
        protocol: z.enum(["TCP", "UDP"]),
        result: portResultSchema,
        status: z.enum(["good", "bad"]),
    }),
    z.object({
        interface: z.string(),
        ip_address: z.string(),
        mac_address: z.string(),
        type: z.literal("device"),
        protocol: z.enum(["TCP", "UDP"]),
        result: deviceResultSchema,
        status: z.enum(["good", "bad"]),
    }),
]);

export const POST = async (req: Request) => {
    try {

        const cookieManager = await cookies();
        const token = cookieManager.get('token');

        if (!token) {
            return Response.json({
                success: false,
                error: "Unauthorized"
            }, { status: 401 })
        }

        const session = await verifyToken(token.value);

        if (!session || session.type !== 'user') {
            return Response.json({
                success: false,
                error: "Invalid token"
            }, { status: 401 })
        }

        const body = await schema.safeParseAsync(await req.json());

        if (!body.success) {
            return Response.json({
                success: false,
                error: body.error
            }, { status: 400 })
        }
        
        await db.insert(reportsTable).values({
            interface: body.data.interface,
            ip_address: body.data.ip_address,
            mac_address: body.data.mac_address,
            type: body.data.type,
            protocol: body.data.protocol,
            result: body.data.result,
            status: body.data.status
        });

        return Response.json({
            success: true,
            message: "Report sent successfully"
        });

    } catch {
        return Response.json({
            success: false,
            error: "Internal Server Error"
        }, { status: 500 })
    }
}