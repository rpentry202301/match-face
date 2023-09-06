import { NextResponse } from 'next/server';

export const GET = async () => {
  const res = await fetch(`${process.env.BE_URL}/departments`,
    {
      cache: 'no-cache',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  ).catch((err) => {
    console.log(err);

    return NextResponse.next();
  });
  
  const data = await res.json();

  console.log("api", data);
  
  return NextResponse.json(
    {
      data: ["a", "b", "c"]
    }
  );
};
