import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  const response = await fetch(`${process.env["BE_URL"]}/projects/${id}`);
  if (!response.ok) throw new Error("Failed to fetch data");
  const data = await response.json();
  return NextResponse.json(data.project);
}
