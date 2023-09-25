import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const res = await request.json();
  const userID = res.user_id;
  const response = await fetch(
    `${process.env.BE_URL}/user/${userID}/answer_requests/deadline`
  );

  if (!response.ok) {
    // throw new Error();
    return NextResponse.error();
  }

  const data = await response.json();
  return NextResponse.json(data);
}
