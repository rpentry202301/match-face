"use client";

import OrangeButton from "@/components/ui/button/OrangeButton";
import GrayButton from "@/components/ui/button/GrayButton";
import ConfirmationModal from "@/components/ui/ConfirmationModal";
import { useState, useEffect } from "react";
import { Project } from "@/types/(general)/(other)/result/project";
import { QuestionList as QuestionType } from "@/types/(general)/(other)/result/questions";
import { QuestionList } from "./questionList";

const getProjects = async (id: number, user_id: number) => {
  try {
    const response = await fetch(`/api/testing`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        project_id: id,
        user_id: user_id,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return false;
  }
};

export const ProjectContent = ({
  id,
  user_id,
}: {
  id: number;
  user_id: number;
}) => {
  const [isDraftOpen, setIsDraftOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [dataFetch, setDataFetch] = useState(true);
  const [project, setProject] = useState<Project | null>(null);
  const [questionList, setQuestionList] = useState<QuestionType[] | null>(null);
  const [answerDate, setAnswerDate] = useState<Date | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const apiProject = await getProjects(id, user_id);
      if (apiProject && apiProject.answerRequest) {
        setProject(apiProject.answerRequest.project);
        setQuestionList(apiProject.answerRequest.questionList);
        setAnswerDate(new Date(apiProject.answerRequest.updateAt));
      } else {
        setDataFetch(false);
      }
    };

    fetchData();
  }, [id, user_id]);

  if (!dataFetch) {
    return <div>この案件のデータはありません</div>;
  }
  if (!project || !questionList || !answerDate) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-1/2 py-5">
      <h1 className="text-xl my-2">案件名:{project.name}</h1>
      <p id="project_detail" className="text-lg">
        {project.detail}
      </p>
      <QuestionList questions={questionList} />
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
