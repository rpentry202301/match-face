import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const res = await request.json();
  const userID = res.user_id;
  const response = await fetch(
    `http://localhost:8080/qa_system_api/user/${userID}/answer_requests/deadline`
  );
  const data = await response.json();
  return NextResponse.json(data);
}
