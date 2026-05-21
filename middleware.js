import { NextResponse } from 'next/server';

export function middleware(request) {
    const user = request.cookies.get('user') || 
                 request.headers.get('authorization');
    
    const protectedRoutes = ['/add-car', '/my-bookings', '/my-added-cars'];
    const { pathname } = request.nextUrl;
    
    if (protectedRoutes.some(route => pathname.startsWith(route))) {
        // Check if user is logged in via localStorage (can't access in middleware)
        // For now, redirect to login if no session cookie
        const sessionCookie = request.cookies.get('better-auth.session');
        
        if (!sessionCookie) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }
    
    return NextResponse.next();
}

export const config = {
    matcher: ['/add-car/:path*', '/my-bookings/:path*', '/my-added-cars/:path*'],
};