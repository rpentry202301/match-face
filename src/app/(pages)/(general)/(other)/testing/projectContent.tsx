"use client";

import { project } from "@/const/testing";
import { QuestionList } from "./questionList";
import OrangeButton from "@/components/ui/button/OrangeButton";
import GrayButton from "@/components/ui/button/GrayButton";
import ConfirmationModal from "@/components/ui/ConfirmationModal";
import { useState } from "react";

export const ProjectContent = ({ id }: { id: number }) => {
  const currentProject = project.filter((project) => project.id === id);
  const [isDraftOpen, setIsDraftOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-1/2 py-5">
      <h1 className="text-xl my-2">{currentProject[0].name}</h1>
      <p className="text-lg">{currentProject[0].project_detail}</p>
      <QuestionList id={id} />
      <div className="flex justify-around my-20">
        <ConfirmationModal
          isOpen={isDraftOpen}
          setIsOpen={setIsDraftOpen}
          message="下書き保存しますか？"
          firstLabel="下書き保存する"
          secondLabel="キャンセル"
        />
        <ConfirmationModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          message="回答を送信してよろしいですか？"
          firstLabel="回答を送信する"
          secondLabel="キャンセル"
        />
        <GrayButton
          label="下書き保存する"
          onClick={() => setIsDraftOpen(true)}
        />
        <OrangeButton label="回答を送信する" onClick={() => setIsOpen(true)} />
      </div>
    </div>
  );
};
