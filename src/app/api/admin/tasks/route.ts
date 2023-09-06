import { NextResponse } from "next/server";

/**
 * @author Hayato Kobayashi
 * @param req Next API request
 * @returns Next API responce
 *
 * @todo_1 検索ワード(searchKeyword), 所属(departmentId)で検索条件を指定
 */
export async function GET(req: Request) {
  // todo_1
  const res = await fetch(`${process.env.BE_URL}/answer_requests`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("res", res.status);
  const tasks = await res.json();
  return NextResponse.json(tasks);
}
