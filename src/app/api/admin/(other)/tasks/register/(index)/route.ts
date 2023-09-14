import { NextRequest, NextResponse } from "next/server";

/**
 * @author Hayato Kobayashi
 * @Todo POSTリクエストを成功させる
 */
export const POST = async (req: NextRequest) => {
  const bodyData = await req.json();

  try {
    const res = await fetch(
      `${process.env.BE_URL}/answer_requests/answer_request`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      }
    );

    const { status, message } = await res.json();
    if (!res.ok) {
      console.log(`status: ${status}, message: ${message}`);
      throw new Error(message);
    }

    return NextResponse.json(
      { messege: "Insert new task was successed." },
      { status: res.status }
    );
  } catch (err) {
    return NextResponse.json({ error: `${err}` }, { status: 500 });
  }
};
