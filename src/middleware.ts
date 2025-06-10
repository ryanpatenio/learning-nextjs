
import { NextRequest, NextResponse } from "next/server";
import getAuthUser from "./lib/getAuthUser";

const protectedRoutes = ['/dashboard','/posts'];
const publicRoutes = ['/login','/register'];
const publicSubPath = ['/posts/show'];

export default async function middleware(req: NextRequest){
    const {pathname} = req.nextUrl;
    
    //Protected Routes
    const isProtected = protectedRoutes.some( route => pathname.startsWith(route))
    && !publicSubPath.some(publicPath => pathname.startsWith(publicPath));

    //public routes
    const isPublic = publicRoutes.includes(pathname);

    const user = await getAuthUser();
    const userId = user?.userId;

    if(isProtected && !userId){
        return NextResponse.redirect(new URL("/login", req.nextUrl));  
    }

    if(isPublic && userId){
        return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}