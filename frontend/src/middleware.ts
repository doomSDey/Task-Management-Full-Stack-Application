import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname, origin } = request.nextUrl;
    const token = request.cookies.get('authToken');
    console.log('Token:', token);

    // Allow requests for static files and specific paths without requiring token
    if (pathname.startsWith('/_next') || pathname.startsWith('/static')) {
        return NextResponse.next();
    }

    // If there is no token and not on the login page, redirect to the login page
    if (!token && !pathname.startsWith('/login')) {
        return NextResponse.redirect(`${origin}/login`);
    }

    // If the user is authenticated and the request is for the login page, redirect to dashboard
    if (token && pathname.startsWith('/login')) {
        return NextResponse.redirect(`${origin}/home`);
    }

    // Continue with the response if none of the above conditions apply
    return NextResponse.next();
}
