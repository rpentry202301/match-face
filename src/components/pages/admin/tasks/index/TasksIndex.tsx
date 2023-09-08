import OrangeButton from "@/components/ui/button/OrangeButton";
import SearchByJobs from "./parts/SearchByJobs";
import TaskList from "./parts/TaskList";
import Link from "next/link";
import { Departments, TasksType } from "@/types/admin/tasks/types";

/**
 * @author Hayato Kobayashi
 * @todo_1 レスポンシブ対応
 */
const TasksIndex = async ({ departments, searchParams }: Props) => {
  // クエリから検索条件{ searchKeyword, departmentId }を取得
  const { searchKeyword, departmentId } = searchParams;
  /**
   * 検索文字列
   * ex)
   * searchKeyword = "a" → "searchKeyword=a" || 
   * searchKeyword = ["a", "b", "c"] → "searchKeyword=a_b_c" || 
   * searchKeyword = undefined → ""
   */
  const searchKeywordQuery = searchKeyword
    ? Array.isArray(searchKeyword)
      ? searchKeyword.map((word, i) => {
        if (i === 0) return `searchKeyword=${word}`;
          return `&searchKeyword=${word}}`;
      }).join("")
      : `searchKeyword=${searchKeyword}`
    : "";
  /**
   * 職種フィルター検索文字列
   * ex)
   * departmentId = 1 → "departmentId=1" || 
   * departmentId = [1, 2, 3] → "departmentId=1_2_3" || 
   * departmentId = undefined → ""
   * @note searchKeywordQueryがある場合は先頭に"&"がつく
   */
  const departmentIdQuery = departmentId
    ? Array.isArray(departmentId)
      ? `${searchKeywordQuery && "&"}departmentId=${departmentId.join("_")}`
      : `${searchKeywordQuery && "&"}departmentId=${departmentId}`
    : "";
  const query = searchKeywordQuery + departmentIdQuery;

  // tasksデータの取得
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/tasks${query && "?" + query}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const tasks: TasksType[] = await res.json();

  return (
    <main>
      <div className="mb-8">
        <SearchByJobs departments={departments} />
      </div>
      <div className="flex justify-center mb-8">
        <Link href={"/admin/tasks/register"} data-testid="link_task_register">
          <OrangeButton label="新規タスク作成" className="hover:underline" />
        </Link>
      </div>
      <div className="flex justify-center">
        <TaskList tasks={tasks} />
      </div>
    </main>
  );
};

type Props = {
  departments: Departments[];
  searchParams: {
    departmentId: string | string[] | undefined;
    searchKeyword: string | string[] | undefined;
  };
};

export default TasksIndex;
