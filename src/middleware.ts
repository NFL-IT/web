import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./app/utils/JWTUtils";
import { cookies } from "next/headers";

export const middleware = async (request: NextRequest) => {
    const cookieManager = await cookies();
    const token = cookieManager.get('token');

    if (request.nextUrl.pathname.toLowerCase().startsWith('/dashboard')) {
        if (!token) {
            return NextResponse.redirect('http://localhost:3000/login');
        }
        
        const session = await verifyToken(token.value);
        if (!session || session.type !== 'admin') {
            cookieManager.delete('token');
            return NextResponse.redirect('http://localhost:3000/login');
        }

        return NextResponse.next();
    } else if (request.nextUrl.pathname.toLowerCase().startsWith('/login')) {

        if (token) {
            const session = await verifyToken(token.value);
            if (!session) {
                cookieManager.delete('token');
                return NextResponse.next();
            }
            return NextResponse.redirect('http://localhost:3000/dashboard');
        }

        return NextResponse.next();
    }
}

export const config: MiddlewareConfig = {
    matcher: ['/dashboard/:path*', '/login'],
}