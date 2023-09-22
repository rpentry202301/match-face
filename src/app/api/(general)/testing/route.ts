import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const req = await request.json();
    const project_id = req.project_id;
    const user_id = req.user_id;

    const response = await fetch(
      `${process.env.BE_URL}/user/${user_id}/answer_requests/${project_id}`,
      {
        cache: "no-cache",
      }
    );

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: `Error: ${error.message}` },
      { status: 500 }
    );
  }
}
