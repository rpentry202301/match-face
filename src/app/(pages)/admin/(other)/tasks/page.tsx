import Loading from "@/components/elements/loading/Loading";
import TasksIndex from "@/components/pages/admin/tasks/index/TasksIndex";
import { Departments } from "@/types/admin/tasks/types";

/**
 * @author Hayato Kobayashi
 */
const TasksPage = async ({ searchParams }: Props) => {
  // 職種データを取得
  const res = await fetch(`${process.env.BE_URL}/departments`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const departments: { departmentList: Departments[] } = await res.json();

  return (
    <TasksIndex
      departments={departments.departmentList}
      searchParams={searchParams}
    />
  );
};

type Props = {
  searchParams: {
    departmentId: string | string[] | undefined;
    searchKeyword: string | string[] | undefined;
  };
};

export default TasksPage;
