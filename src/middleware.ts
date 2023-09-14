import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const userCookie: boolean = request.cookies.has('userId');
  const adminCookie: boolean = request.cookies.has('administratorId');

  if (
    adminCookie === false &&
    request.nextUrl.pathname.startsWith('/admin') === true &&
    request.nextUrl.pathname.includes('login') === false
  ) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  } else if (adminCookie === true) {
    return NextResponse.next();
  }

  if (
    userCookie === false &&
    request.nextUrl.pathname.includes('login') === false
  ) {
    return NextResponse.redirect(new URL('/login', request.url));
  } else if (userCookie === true) {
    return NextResponse.next();
  }
}

export const config = {
  // 正規表現を使うのを断念、直接middlewareをかけるパスを指定
  matcher: [
    '/',
    '/questions',
    '/testing/:path*',
    '/histories',
    '/result/:path*',
    '/admin/:path*',
  ],
};
