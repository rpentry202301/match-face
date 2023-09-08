import { Answer_RequestsType } from "@/types/admin/tasks/types";
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
  // console.log("res", res.status);
  const answerRequests: Answer_RequestsType = await res.json();
  const tasks = answerRequests.answerRequests; // fetch時に"answerRequests.answerRequestsの形になるので修正"
  return NextResponse.json(tasks);
}
