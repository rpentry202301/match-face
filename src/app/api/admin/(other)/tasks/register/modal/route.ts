import { NextResponse } from 'next/server';

export const GET = async () => {
  const departments = await fetch(`${process.env.BE_URL}/departments`).then((res) => res.json());

  console.log(departments);
  
  return NextResponse.json(
    {
      data: departments,
    },
    {
      status: 200,
    }
  );
};
