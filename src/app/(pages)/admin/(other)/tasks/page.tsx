import Loading from "@/components/elements/loading/Loading";
import TasksIndex from "@/components/pages/admin/tasks/index/TasksIndex";
import { Suspense } from "react";

const TasksPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <TasksIndex />
    </Suspense>
  );
};

export default TasksPage;
