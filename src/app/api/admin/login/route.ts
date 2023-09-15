import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const res = await request.json();
  const administratorId = res.administratorId;
  const password = res.password;
  try {
    const response = await fetch(
      `${process.env.BE_URL}/administrators/${administratorId}?password=${password}`
    );
    const data = await response.json();
    console.log('data', data);
    if (data.administrator.id && data.administrator.length !== 0) {
      cookies().set({
        name: 'administratorId',
        value: `${data.administrator.id}`,
        httpOnly: true,
        secure: true,
        path: '/',
      });
    }
    return NextResponse.json(data);
  } catch (error) {
    throw new Error('api error');
  }
}
