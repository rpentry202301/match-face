import OrangeButton from "@/components/ui/button/OrangeButton";
import SearchByJobs from "./parts/SearchByJobs";
import TaskList from "./parts/TaskList";
import Link from "next/link";
import { Answer_RequestsType, Departments } from "@/types/admin/tasks/types";

/**
 * @author Hayato Kobayashi
 * @todo_1 レスポンシブ対応
 */
const TasksIndex = async ({ searchParams }: Props) => {
  // 職種データを取得
  const res1 = await fetch(`${process.env.BE_URL}/departments`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const departments: { departmentList: Departments[] } = await res1.json();

  // クエリから検索条件{ searchKeyword, departmentId }を取得
  const { searchKeyword, departmentId } = searchParams;
  /**
   * ワード検索クエリ
   * ex) "a b c" → "searchKeyword=a&searchKeyword=b&searchKeyword=c"
   */
  const searchKeywordQuery = searchKeyword
    ? Array.isArray(searchKeyword)
      ? searchKeyword
          .map((word, i) => {
            if (i === 0) return `searchKeyword=${word}`;
            return `&searchKeyword=${word}`;
          })
          .join("")
      : `searchKeyword=${searchKeyword}`
    : "";
  /**
   * 職種フィルター検索クエリ
   * ex) [1, 2, 3] → "departmentId=1&departmentId=2&departmentId=3"
   * @note searchKeywordQueryがある場合は先頭に"&"がつく
   */
  const departmentIdQuery = departmentId
    ? Array.isArray(departmentId)
      ? departmentId
          .map((id, i) => {
            if (i === 0)
              return `${searchKeywordQuery && "&"}departmentId=${id}`;
            return `&departmentId=${id}`;
          })
          .join("")
      : `${searchKeywordQuery && "&"}departmentId=${departmentId}`
    : "";
  const query = searchKeywordQuery + departmentIdQuery;

  // tasksデータの取得
  const res2 = await fetch(
    `${process.env.BE_URL}/answer_requests${query && "?" + query}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const answer_requests: Answer_RequestsType = await res2.json();

  return (
    <main>
      <div className="mb-8">
        <SearchByJobs departments={departments.departmentList} />
      </div>
      <div className="flex justify-center mb-8">
        <Link href={"/admin/tasks/register"} data-testid="link_task_register">
          <OrangeButton label="新規タスク作成" className="hover:underline" />
        </Link>
      </div>
      <div className="flex justify-center">
        <TaskList tasks={answer_requests.answerRequests} />
      </div>
    </main>
  );
};

type Props = {
  searchParams: {
    departmentId: string | string[] | undefined;
    searchKeyword: string | string[] | undefined;
  };
};

export default TasksIndex;
