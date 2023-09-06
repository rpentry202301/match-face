import OrangeButton from "@/components/ui/button/OrangeButton";
import SearchByJobs from "./parts/SearchByJobs";
import TaskList from "./parts/TaskList";
import Link from "next/link";

// 削除予定
import { tasks } from "@/const/tasks";

const TasksIndex = () => {
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
        <TaskList tasks={tasks}/>
      </div>
    </main>
  );
};

export default TasksIndex;
