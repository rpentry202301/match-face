import { NextResponse } from "next/server";

export const GET = async () => {
  const url = process.env.NEXT_PUBLIC_BE_URL;
  const response = await fetch(`${url}/users`);
  const data = await response.json();
  return NextResponse.json(data);
};
