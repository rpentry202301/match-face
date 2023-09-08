"use client";

import { AnswerList } from "./answerList";
import { CommentContent } from "./comment";
import OrangeButton from "@/components/ui/button/OrangeButton";
import { useRouter } from "next/navigation";
import type { Project } from "@/types/(general)/(other)/result/project";
import type { QuestionList } from "@/types/(general)/(other)/result/questions";
import type { Comment } from "@/types/(general)/(other)/result/questions";
import { useEffect, useState } from "react";

type Props = {
  project_id: number;
};

const getProjects = async (project_id: number) => {
  try {
    const response = await fetch(`/api/result`, {
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

export const AnswerContent = ({ project_id }: Props) => {
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [questionList, setQuestionList] = useState<QuestionList | null>(null);
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
      <h2 className="text-xl my-2">案件名：{project.name}</h2>
      <p className="text-lg">{project.detail}</p>
      <AnswerList questionList={questionList} />
      <CommentContent comment={currentComment} />
      <div className="flex justify-around my-20">
        <OrangeButton
          className="border rounded-none"
          label="質問一覧へ"
          onClick={() => router.push("/questions")}
        />
        <OrangeButton
          className="border rounded-none"
          label="回答履歴一覧へ"
          onClick={() => router.push("/histories")}
        />
      </div>
    </div>
  );
};
