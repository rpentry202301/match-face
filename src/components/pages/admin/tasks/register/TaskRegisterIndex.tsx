'use client';
import OrangeButton from "@/components/ui/button/OrangeButton";

/**
 * @author Hayato Kobayashi
 */
const TaskRegisterIndex = ({ children }: Props) => {
  return (
    <main>
      <div className="border-2 border-light-gray w-3/5 mx-auto my-10 p-8">
        <div>
          {children}
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
}

export default TaskRegisterIndex;
