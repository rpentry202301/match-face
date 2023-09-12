import TaskRegisterIndex from "@/components/pages/admin/tasks/register/TaskRegisterIndex";
import SelectQuestions from "@/components/pages/admin/tasks/register/parts/SelectQuestions";
import SelectUsers from "@/components/pages/admin/tasks/register/parts/SelectUsers";
import { cookies } from "next/headers";

/**
 * @author Hayato Kobayashi
 */
const TaskRegisterPage = () => {
  const cookieStore = cookies();
  const cookieId = cookieStore.get("administratorId");

  return (
    <TaskRegisterIndex id={`${cookieId?.value}`}>;
      <SelectUsers />
      <SelectQuestions />
    </TaskRegisterIndex>
  );
};

export default TaskRegisterPage;
