import { NextResponse } from 'next/server';
import { URLSearchParams } from 'url';

export const GET = async (req: Request) => {
  const query = new URLSearchParams(req.url.split('?')[1]);

  const response = await fetch(
    `${process.env.BE_URL}/users?${query}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (!response.ok) {
    return NextResponse.error();
  }

  const data = await response.json()

  console.log(data);
  
  return NextResponse.json(data);
};
