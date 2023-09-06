import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const req = await request.json();
  const project_id = req.project_id;
  const response = await fetch(
    `http://localhost:8080/qa_system_api/answer_requests/${project_id}`
  );
  const data = await response.json();
  return NextResponse.json(data);
}
