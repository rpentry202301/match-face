"use client";
import OrangeButton from "@/components/ui/button/OrangeButton";
import SelectDeadline from "./parts/SelectDeadline";
import { ChangeEvent, useState } from "react";
import { useUserSelect } from "@/hooks/store/context/UserSelectContext";
import { useRouter } from "next/navigation";
import { useSelectedQuestion } from "@/hooks/store/context/SelectedQuestionContext";
import ConfirmModal from "./parts/ConfirmModal";

/**
 * @author Hayato Kobayashi
 */
const TaskRegisterIndex = ({ children, id }: Props) => {
  const [userSelect] = useUserSelect();
  const [selectedQuestion, selectedQuestionDispatch] = useSelectedQuestion();
  const [deadline, setDeadline] = useState({
    year: new Date().getFullYear().toString(),
    month: (new Date().getMonth() + 1).toString(),
    day: new Date().getDate().toString(),
    hour: `${18}`,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const router = useRouter();

  const handleChangeDeadline = (e: ChangeEvent<HTMLSelectElement>) => {
    setDeadline({
      ...deadline,
      [`${e.target.name}`]: e.target.value,
    });
  };

  const handleClickPost = async () => {
    setIsLoading(true);
    setError(false);

    // deadlineをtimestamp型に成型
    const { year, month, day, hour } = deadline;
    const deadline2Timestamp = `${year}-${("0" + month).slice(-2)}-${(
      "0" + day
    ).slice(-2)}T${("0" + hour).slice(-2)}:00:00`;

    const postData = {
      administraorId: Number(id),
      userIds: userSelect.map((user) => Number(user.id)),
      projectId: selectedQuestion.projectId,
      questionIds: selectedQuestion.list.map((question) => Number(question.id)),
      deadline: deadline2Timestamp,
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/tasks/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      }
    );

    if (!res.ok) {
      setError(true);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
  };

  const btnDisabled =
    isLoading ||
    userSelect.length === 0 ||
    selectedQuestion.projectId === 0 ||
    selectedQuestion.list.length === 0;

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
            <ConfirmModal
              isOpened={confirm}
              submit={() => handleClickPost()}
              close={() => setConfirm(false)}
            >
              <OrangeButton
                label="新規タスクを作成"
                className={
                  btnDisabled
                    ? "text-base bg-orange opacity-50 hover:bg-orange"
                    : "text-base"
                }
                onClick={() => setConfirm(true)}
                disabled={btnDisabled}
              />
            </ConfirmModal>
          </div>
          {error && (
            <p className="text-red text-center mt-4">
              エラーが発生しました。管理者にお問い合わせ下さい。
            </p>
          )}
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
