import TasksIndex from "@/components/pages/admin/tasks/index/TasksIndex";

/**
 * @author Hayato Kobayashi
 */
const TasksPage = ({ searchParams }: Props) => {
  return <TasksIndex searchParams={searchParams} />;
};

type Props = {
  searchParams: {
    departmentId: string | string[] | undefined;
    searchKeyword: string | string[] | undefined;
  };
};

export default TasksPage;
