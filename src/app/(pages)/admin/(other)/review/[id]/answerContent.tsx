"use client";

import { project } from "@/const/testing";
import { AnswerList } from "./answerList";
import { CommentContent } from "./comment";
import { Answer } from "@/const/review";

type Props = {
  user_id: number;
  project_id: number;
  admin_id: number;
};

export const AnswerContent = ({ user_id, project_id, admin_id }: Props) => {
  const currentProject = project.filter((project) => project.id === project_id);
  const currentAnswer = Answer.filter(
    (answer) => answer.project_id === project_id
  );

  return (
    <div className="w-1/2 py-5">
      <div className="flex justify-between items-center my-3">
        <h1 className="text-2xl">回答の確認</h1>
        {/*現状のデータでは4以降の解答データを呼び出そうとするとエラーになります */}
        <p>回答日時:{currentAnswer[0].answer_date.toLocaleDateString()}</p>
      </div>
      <hr className="border border-black" />
      <h2 className="text-xl my-2">案件名:{currentProject[0].name}</h2>
      <p className="text-lg">{currentProject[0].project_detail}</p>
      <AnswerList user_id={user_id} project_id={project_id} />
      <CommentContent admin_id={admin_id} />
    </div>
  );
};
