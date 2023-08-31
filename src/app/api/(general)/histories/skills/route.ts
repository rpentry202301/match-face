import { NextResponse } from "next/server";

export async function GET() {
  const response = await fetch(`http://localhost:8080/qa_system_api/skills`);
  const data = await response.json();
  return NextResponse.json(data);
}
