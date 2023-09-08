import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const req = await request.json();
  const project_id = req.project_id;
  const response = await fetch(
    `${process.env.BE_URL}/answer_requests/${project_id}`,
    {
      cache: "no-cache",
    }
  );
  const data = await response.json();
  return NextResponse.json(data);
}
