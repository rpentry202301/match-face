'use client';
import OrangeButton from "@/components/ui/button/OrangeButton";
import SearchByJobs from "./parts/SearchByJobs";
import TaskList from "./parts/TaskList";
import Link from "next/link";
import { TasksType } from "@/types/admin/tasks/types";
import { useSearchParams } from "next/navigation";

/**
 * @author Hayato Kobayashi
 * @todo_1 レスポンシブ対応
 */
const TasksIndex = async () => {
  // クエリから検索条件{ searchKeyword, departmentId }を取得
  const searchParams = useSearchParams();
  // console.log("searchParams", searchParams.toString());
  const query = searchParams.toString();

  // tasksデータの取得
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/tasks${query && "?" + query}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const tasks: TasksType[] = await res.json();
  // console.log("tasks", tasks);

  return (
    <main>
      <div className="mb-8">
        <SearchByJobs />
      </div>
      <div className="flex justify-center mb-8">
        <Link href={"/admin/tasks/register"} data-testid="link_task_register">
          <OrangeButton label="新規タスク作成" className="hover:underline"/>
        </Link>
      </div>
      <div className="flex justify-center">
        <TaskList tasks={tasks} />
      </div>
    </main>
  );
};

export default TasksIndex;
