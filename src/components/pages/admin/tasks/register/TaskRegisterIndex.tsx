import OrangeButton from "@/components/ui/button/OrangeButton";
import SelectDeadline from "./parts/SelectDeadline";
import SelectQuestions from "./parts/SelectQuestions";
import SelectUsers from "./parts/SelectUsers";

const TaskRegisterIndex = () => {
  return (
    <main>
      <div className="border-2 border-light-gray w-3/5 mx-auto my-10 p-8">
        <div>
          <SelectUsers />
          <SelectQuestions />
          <SelectDeadline />
          <div className="flex justify-center mt-10">
            <OrangeButton label="新規タスクを作成" className="text-base"/>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TaskRegisterIndex;
