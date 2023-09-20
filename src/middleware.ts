import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const userCookie: boolean = request.cookies.has('userId');
  const adminCookie: boolean = request.cookies.has('administratorId');

  if (
    userCookie === false &&
    adminCookie === false &&
    request.nextUrl.pathname.startsWith('/admin') === false &&
    !request.nextUrl.pathname.match('/login')
  ) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (
    userCookie === false &&
    adminCookie === false &&
    request.nextUrl.pathname.startsWith('/admin') === true &&
    !request.nextUrl.pathname.match('/admin/login')
  ) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  if (
    userCookie === true &&
    adminCookie === false &&
    request.nextUrl.pathname.startsWith('/admin') === true &&
    !request.nextUrl.pathname.match('/login') &&
    !request.nextUrl.pathname.match('/admin/login')
  ) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (
    userCookie === false &&
    adminCookie === true &&
    request.nextUrl.pathname.startsWith('/admin') === false &&
    !request.nextUrl.pathname.match('/login') &&
    !request.nextUrl.pathname.match('/admin/login')
  ) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // cookieの実装の仕様上念の為つけた
  if (
    userCookie === true &&
    adminCookie === true &&
    !request.nextUrl.pathname.match('/login') &&
    !request.nextUrl.pathname.match('/admin/login')
  ) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
