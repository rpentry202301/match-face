import SelectDeadline from "./parts/SelectDeadline";
import SelectQuestions from "./parts/SelectQuestions";
import SelectUsers from "./parts/SelectUsers";

const TaskRegisterIndex = () => {
  return (
    <main>
        <SelectUsers />
        <SelectQuestions />
        <SelectDeadline />
    </main>
  );
};

export default TaskRegisterIndex;
