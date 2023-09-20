"use client";

import { AnswerList } from "./answerList";
import { CommentContent } from "./comment";
import { useEffect, useState } from "react";
import type { Project } from "@/types/(general)/(other)/result/project";
import type { QuestionList } from "@/types/(general)/(other)/result/questions";
import type { Comment } from "@/types/(general)/(other)/result/questions";

type Props = {
  user_id: number;
  project_id: number;
  admin_id: number;
};

const getProjects = async (project_id: number) => {
  try {
    const response = await fetch(`/api/admin/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        project_id: project_id,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

export const AnswerContent = ({ user_id, project_id, admin_id }: Props) => {
  const [project, setProject] = useState<Project | null>(null);
  const [questionList, setQuestionList] = useState<QuestionList[] | null>(null);
  const [currentComment, setCurrentComment] = useState<Comment | null>(null);
  const [answerDate, setAnswerDate] = useState<Date | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const apiProject = await getProjects(project_id);
      if (apiProject && apiProject.answerRequest) {
        setProject(apiProject.answerRequest.project);
        setQuestionList(apiProject.answerRequest.questionList);
        setCurrentComment(apiProject.answerRequest.comment);
        setAnswerDate(new Date(apiProject.answerRequest.updateAt));
      }
    };

    fetchData();
  }, [project_id]);

  if (!project || !questionList || !currentComment || !answerDate) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-1/2 py-5">
      <div className="flex justify-between items-center my-3">
        <h1 className="text-2xl">回答の確認</h1>
        <p>回答日時:{answerDate.toLocaleDateString()}</p>
      </div>
      <hr className="border border-black" />
      <h2 className="text-xl my-2">案件名:{project.name}</h2>
      <p className="text-lg">{project.detail}</p>
      <AnswerList questionList={questionList} />
      <CommentContent comment={currentComment} admin_id={admin_id} />
    </div>
  );
};
