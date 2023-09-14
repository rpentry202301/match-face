import { NextResponse } from "next/server";

export async function GET() {
  const url = process.env['BE_URL']
  const response = await fetch(`${url}/groups`, {
    cache: "no-cache",
  });
  if (!response.ok) {
    throw new Error("エラー");
  }
  const data = await response.json();
  return NextResponse.json(data.groupList);
}
