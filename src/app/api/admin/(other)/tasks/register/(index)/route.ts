import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const bodyData = req.body;

  try {
    await fetch(`${process.env.BE_URL}/answer_requests/answer_request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: bodyData,
    });
    return NextResponse.json("Insert new task was successed.");
  } catch {
    return NextResponse.error();
  }
};
