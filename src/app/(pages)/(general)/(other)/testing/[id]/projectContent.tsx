"use client";

import { project } from "@/const/testing";
import { QuestionList } from "./questionList";
import OrangeButton from "@/components/ui/button/OrangeButton";
import GrayButton from "@/components/ui/button/GrayButton";
import ConfirmationModal from "@/components/ui/ConfirmationModal";
import { useState } from "react";

export const ProjectContent = ({ id }: { id: string }) => {
  const currentProject = project.filter((project) => project.id === id);
  const [isDraftOpen, setIsDraftOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-1/2 py-5">
      <h1 className="text-xl my-2">案件名:{currentProject[0].name}</h1>
      <p id="project_detail" className="text-lg">
        {currentProject[0].project_detail}
      </p>
      <QuestionList id={id} />
      <div className="flex justify-around my-20">
        <ConfirmationModal
          isOpen={isDraftOpen}
          setIsOpen={setIsDraftOpen}
          message="下書き保存しますか？"
          firstLabel="下書き保存する"
          secondLabel="キャンセル"
          id="draft-modal"
        />
        <ConfirmationModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          message="回答を送信してよろしいですか？"
          firstLabel="回答を送信する"
          secondLabel="キャンセル"
          id="answer-modal"
        />
        <GrayButton
          className="border rounded-none w-50"
          label="下書きを保存する"
          onClick={() => setIsDraftOpen(true)}
        />
        <OrangeButton
          className="border rounded-none"
          label="回答を送信する"
          onClick={() => setIsOpen(true)}
        />
      </div>
    </div>
  );
};
