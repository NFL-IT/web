import { JWTPayload, SignJWT, jwtVerify } from 'jose';

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
const algorithm = 'HS512';
const maxAge = '7d';

export interface TokenPayload extends JWTPayload {
    id: string;
    email: string;
    username: string;
    type: 'admin' | 'user';
}

export async function createToken(data: TokenPayload): Promise<string> {
    const token = await new SignJWT(data)
        .setProtectedHeader({ alg: algorithm })
        .setExpirationTime(maxAge)
        .sign(secretKey);
    return token;
}

export async function verifyToken(token: string): Promise<TokenPayload | null> {
    try {
        const { payload } = await jwtVerify<TokenPayload>(token, secretKey, {
            algorithms: [algorithm],
        });
        return payload;
    } catch {
        return null;
    }
}