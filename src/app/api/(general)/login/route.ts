import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const res = await request.json();
  const userId = res.userId;
  const password = res.password;
  const response = await fetch(
    `http://localhost:8080/qa_system_api/users/${userId}?password=${password}`
  );
  const data = await response.json();
  cookies().set({
    name: 'userId',
    value: `${userId}`,
    httpOnly: true,
    secure: true,
    path: '/',
  });
  return NextResponse.json(data);
}
