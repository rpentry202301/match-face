import TaskRegisterIndex from "@/components/pages/admin/tasks/register/TaskRegisterIndex";
import SelectDeadline from "@/components/pages/admin/tasks/register/parts/SelectDeadline";
import SelectQuestions from "@/components/pages/admin/tasks/register/parts/SelectQuestions";
import SelectUsers from "@/components/pages/admin/tasks/register/parts/SelectUsers";

const TaskRegisterPage = () => {
  return (
    <TaskRegisterIndex>
      <SelectUsers />
      <SelectQuestions />
      <SelectDeadline />
    </TaskRegisterIndex>
  );
};

export default TaskRegisterPage;
