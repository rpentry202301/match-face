"use client";
import OrangeButton from "@/components/ui/button/OrangeButton";
import SelectDeadline from "./parts/SelectDeadline";
import { ChangeEvent, useState } from "react";
import { useUserSelect } from "@/hooks/store/context/UserSelectContext";
import { useRouter } from "next/navigation";

/**
 * @author Hayato Kobayashi
 */
const TaskRegisterIndex = ({ children, id }: Props) => {
  const [userSelect] = useUserSelect();
  const [deadline, setDeadline] = useState({
    year: new Date().getFullYear().toString(),
    month: (new Date().getMonth() + 1).toString(),
    day: new Date().getDate().toString(),
    hour: `${18}`,
  });

  const router = useRouter();

  const handleChangeDeadline = (e: ChangeEvent<HTMLSelectElement>) => {
    setDeadline({
      ...deadline,
      [`${e.target.name}`]: e.target.value,
    });
  };

  const handleClickPost = () => {
    // deadlineをtimestamp型に成型
    const { year, month, day, hour } = deadline;
    const deadline2Timestamp = `${year}-${("0" + month).slice(-2)}-${(
      "0" + day
    ).slice(-2)}T${("0" + hour).slice(-2)}:00:00`;
  };

  return (
    <main>
      <div className="border-2 border-light-gray w-3/5 mx-auto my-10 p-8">
        <div>
          {children}
          <SelectDeadline
            state={deadline}
            handleChange={handleChangeDeadline}
          />
          <div className="flex justify-center mt-10">
            <OrangeButton
              label="新規タスクを作成"
              className="text-base"
              onClick={handleClickPost}
            />
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
