"use client";
import OrangeButton from "@/components/ui/button/OrangeButton";
import SelectDeadline from "./parts/SelectDeadline";
import { ChangeEvent, useState } from "react";

/**
 * @author Hayato Kobayashi
 */
const TaskRegisterIndex = ({ children, id }: Props) => {
  const [deadline, setDeadline] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: 1,
    time: 18,
  });

  const handleChangeDeadline = (e: ChangeEvent<HTMLSelectElement>) => {
    setDeadline({
      ...deadline,
      [`${e.target.name}`]: e.target.value,
    });
  };

  return (
    <main>
      <div className="border-2 border-light-gray w-3/5 mx-auto my-10 p-8">
        <div>
          {children}
          <SelectDeadline state={deadline} handleChange={handleChangeDeadline}/>
          <div className="flex justify-center mt-10">
            <OrangeButton label="新規タスクを作成" className="text-base" />
          </div>
        </div>
      </div>
    </main>
  );
};

type Props = {
  children: React.ReactNode;
  id: string;
};

export default TaskRegisterIndex;
