import OrangeButton from "@/components/ui/button/OrangeButton";
import SearchByJobs from "./parts/SearchByJobs";
import TaskList from "./parts/TaskList";
import Link from "next/link";
import { headers } from "next/headers";
import { TasksType } from "@/types/admin/tasks/types";

/**
 * @author Hayato Kobayashi
 * @todo_1 レスポンシブ対応
 */
const TasksIndex = async () => {
  // ヘッダーから検索条件{ searchKeyword, departmentId }を取得
  const headerList = headers();
  const searchKeyword = headerList.get("searchKeyword");
  const departmentId = headerList.get("departmentId");

  // tasksデータの取得
  const res = await fetch(
    `${process.env.NEXT_API_URL}/api/admin/tasks?searchKeyword=${searchKeyword}&departmentId=${departmentId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const tasks: TasksType[] = await res.json();
  console.log("tasks", tasks[0].answerUserList.length);

  return (
    <main>
      <div className="mb-8">
        <SearchByJobs />
      </div>
      <div className="flex justify-center mb-8">
        <Link href={"/admin/tasks/register"} data-testid="link_task_register">
          <OrangeButton label="新規タスク作成" />
        </Link>
      </div>
      <div className="flex justify-center">
        <TaskList tasks={tasks} />
      </div>
    </main>
  );
};

export default TasksIndex;
