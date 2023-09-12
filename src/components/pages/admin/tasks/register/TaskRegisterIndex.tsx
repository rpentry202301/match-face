'use client';
import OrangeButton from "@/components/ui/button/OrangeButton";
import SelectDeadline from "./parts/SelectDeadline";

/**
 * @author Hayato Kobayashi
 */
const TaskRegisterIndex = ({ children, id }: Props) => {
  return (
    <main>
      <div className="border-2 border-light-gray w-3/5 mx-auto my-10 p-8">
        <div>
          {children}
          <SelectDeadline />
          <div className="flex justify-center mt-10">
            <OrangeButton label="新規タスクを作成" className="text-base"/>
          </div>
        </div>
      </div>
    </main>
  );
};

type Props = {
  children: React.ReactNode;
  id: string;
}

export default TaskRegisterIndex;
