"use client";

import { project } from "@/const/testing";
import { AnswerList } from "./answerList";
import { CommentContent } from "./comment";
import OrangeButton from "@/components/ui/button/OrangeButton";

export const AnswerContent = ({ id }: { id: number }) => {
  const currentProject = project.filter((project) => project.id === id);

  return (
    <div className="w-1/2 py-5">
      <div className="flex justify-between items-center my-3">
        <h1 className="text-2xl">回答の確認</h1>
        <p>回答日時：</p>
      </div>
      <hr className="border border-black" />
      <h2 className="text-xl my-2">{currentProject[0].name}</h2>
      <p className="text-lg">{currentProject[0].project_detail}</p>
      <AnswerList id={id} />
      <CommentContent />
      <div className="flex justify-around my-20">
        <OrangeButton label="質問一覧へ" />
        <OrangeButton label="回答履歴一覧へ" />
      </div>
    </div>
  );
};
