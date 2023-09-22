import { NextResponse } from "next/server";

export async function GET() {
  const response = await fetch(`${process.env.BE_URL}/skills`);
  const data = await response.json();
  return NextResponse.json(data);
}
