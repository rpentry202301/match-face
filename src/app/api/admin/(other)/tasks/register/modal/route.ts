import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  const query = new URLSearchParams(req.url.split('?')[1]);

  const response = await fetch(`${process.env.BE_URL}/users?${query}`, {
    cache: 'no-cache',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    return NextResponse.error();
  }

  const data = await response.json();
  
  return NextResponse.json(data, {
    status: response.status,
  });
};
