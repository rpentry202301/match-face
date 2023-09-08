import { Answer_RequestsType } from "@/types/admin/tasks/types";
import { NextRequest, NextResponse } from "next/server";

/**
 * @author Hayato Kobayashi
 * @param req Next API request
 * @returns Next API responce
 *
 * @todo_1 検索ワード(searchKeyword), 所属(departmentId)で検索条件を指定
 */
export async function GET(req: NextRequest) {
  // クエリから検索条件を取得
  const searchParams = req.nextUrl.searchParams;
  const searchKeyword = searchParams.get("searchKeyword");
  const departmentId = searchParams.get("departmentId");

  /**
   * searchKeywordから加工されたクエリ
   * ex) "a_b_c" → "searchKeyword=a&searchKeyword=b&searchKeyword=c"
   */
  const searchKeywordQuery = searchKeyword
    ? searchKeyword
        .split("_")
        .map((id, i) => {
          if (i === 0) return `searchKeyword=${id}`;
          return `&searchKeyword=${id}`;
        })
        .toString()
    : "";
  /**
   * departmentIdから加工されたクエリ
   * ex) "1_2_3" → "searchKeyword=1&searchKeyword=2&searchKeyword=3"
   * @note searchKeywordQueryがある場合は先頭に"&"がつく。
   */
  const departmentIdQuery = departmentId
    ? departmentId
        .split("_")
        .map((id, i) => {
          if (i === 0) return `${searchKeywordQuery && "&"}departmentId=${id}`;
          return `&departmentId=${departmentId}`;
        })
        .toString()
    : "";

  const query = searchKeywordQuery + departmentIdQuery;

  const res = await fetch(
    `${process.env.BE_URL}/answer_requests${query && "?" + query}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  // console.log("res", res.status);
  const answerRequests: Answer_RequestsType = await res.json();
  const tasks = answerRequests.answerRequests; // fetch時に"answerRequests.answerRequestsの形になるので修正"
  return NextResponse.json(tasks);
}
