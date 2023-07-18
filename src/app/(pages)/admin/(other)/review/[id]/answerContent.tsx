"use client";

import { project } from "@/const/testing";
import { AnswerList } from "./answerList";
import { CommentContent } from "./comment";
import OrangeButton from "@/components/ui/button/OrangeButton";
import GrayButton from "@/components/ui/button/GrayButton";
import { Answer } from "@/const/review";
import { useRouter } from "next/navigation";
import ConfirmationModal from "@/components/ui/ConfirmationModal";
import { useState } from "react";

type Props = {
  user_id: string;
  project_id: string;
  admin_id: string;
};

export const AnswerContent = ({ user_id, project_id, admin_id }: Props) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
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
      <CommentContent
        user_id={user_id}
        project_id={project_id}
        admin_id={admin_id}
      />
      <div className="flex justify-around my-20">
        <ConfirmationModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          message="コメントを送信してよろしいですか？"
          firstLabel="コメントを送信する"
          secondLabel="キャンセル"
          id="comment-modal"
        />
        <OrangeButton
          label="コメントを送信する"
          className="w-50 border rounded-none"
          onClick={() => setIsOpen(true)}
        />
        <GrayButton
          className="border rounded-none w-50"
          label="回答履歴一覧へ戻る"
          onClick={() => router.push("/admin/histories")}
        />
      </div>
    </div>
  );
};
