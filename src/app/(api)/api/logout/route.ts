import { cookies } from "next/headers"

export const GET = async () => {
    const cookieManager = await cookies();

    cookieManager.delete("token");

    return Response.redirect("http://localhost:3000/login");
}