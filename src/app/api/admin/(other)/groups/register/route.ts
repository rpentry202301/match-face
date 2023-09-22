import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const url = process.env["BE_URL"];

  try {
    const data = await req.json();
    const response = await fetch(`${url}/user_groups/user_group`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      cache:'no-cache'
    });
    if (response.ok) {
      return NextResponse.json(data);
    } else {
      console.error(
        "外部APIへのリクエストエラー:",
        response.status,
        response.statusText
      );
      return NextResponse.error();
    }
  } catch (error) {
    console.error("エラー発生:", error);
    return NextResponse.error();
  }
}
