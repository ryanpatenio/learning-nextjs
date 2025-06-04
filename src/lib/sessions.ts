import "server-only"

import { JWTPayload, jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

const secret_key = process.env.SECRET_KEY;
const encodedKey = new TextEncoder().encode(secret_key);

interface SessionPayload extends JWTPayload {
    userId : string;
    expiresAt : Date;
}

export async function encrypt(payload: SessionPayload ):Promise<string> {
    return  new SignJWT(payload)
        .setProtectedHeader({ alg : "HS256"})
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(encodedKey);
}

export async function decrypt(token : string): Promise <SessionPayload | null> {
    try {
        const { payload } = await jwtVerify<SessionPayload>(token , encodedKey, {
            algorithms : ["HS256"]
        });
        return payload;
    } catch (error) {
        console.log("Failed to verify the session",error);
        return null;
    }
}

export async function createSession(userId : string): Promise<void>{
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 1000);

    const session  = await encrypt({ userId, expiresAt});
    const cookieStore = await cookies();

    cookieStore.set("session", session, {
        httpOnly : true,
        secure : true,
        expires : expiresAt,
        sameSite : "lax",
        path : "/"
    });
    
}