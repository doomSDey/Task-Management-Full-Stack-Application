import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname, origin } = request.nextUrl;
    const token = request.cookies.get('authToken');
    console.log('Token:', token);

    // Allow requests for static files and specific paths without requiring token
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/static') ||
        pathname.startsWith('/favicon.ico') ||
        pathname.startsWith('/api')
      ) {
        return NextResponse.next();
      }
    

    // If there is no token and not on the signIn page, redirect to the signIn page
    if (!token && (!pathname.startsWith('/sign'))) {
        return NextResponse.redirect(`${origin}/signIn`);
    }

    // If the user is authenticated and the request is for the signIn page, redirect to home
    if (token && (!pathname.startsWith('/home'))) {
        return NextResponse.redirect(`${origin}/home`);
    }

    // Continue with the response if none of the above conditions apply
    return NextResponse.next();
}
