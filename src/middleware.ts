import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const userCookie: boolean = request.cookies.has('userId');
  const adminCookie: boolean = request.cookies.has('administratorId');

  if (
    userCookie === false &&
    request.nextUrl.pathname.includes('login') === false
  ) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (
    adminCookie === false &&
    request.nextUrl.pathname.startsWith('/admin') === true &&
    request.nextUrl.pathname.includes('login') === false
  ) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  if (userCookie === true && adminCookie !== false) {
    return NextResponse.next();
  }

  if (adminCookie === true && userCookie !== false) {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/((?!_next/static).*)'],
};
