"use client";

import AnswerButton from "@/components/pages/general/questions/AnswerButton";
import Link from "next/link";
import { Key, useEffect, useState } from "react";

type ProjectType = {
  id: Key;
  deadline: string;
  project: {
    name: string;
    detail: string;
  };
  answered: boolean;
};

// 回答期限内のプロジェクトの取得
const getProject = async (userId: number) => {
  try {
    const response = await fetch("/api/questions", {
      cache: "no-store",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const FetchData = await response.json();
    const data = FetchData.answerRequestList;
    console.log("取得したデータ", data);
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return false;
  }
};

export const QuestionsContent = ({ userId }: { userId: number }) => {
  const [answerRequestList, setAnswerRequestList] = useState<ProjectType[]>([]);
  const [dataFetch, setDataFetch] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const apiProject = await getProject(userId);
      if (apiProject.length > 0) {
        setAnswerRequestList(apiProject);
      }
      if (apiProject.length <= 0) {
        setDataFetch(false);
      }
    };
    fetchData();
  }, [userId]);

  // プロジェクトがなかった場合の画面表示
  if (!dataFetch) {
    return <div>現在質問はありません</div>;
  }
  // データ取得中の画面表示
  if (!answerRequestList) {
    return <div>Loading...</div>;
  }

  //  案件詳細の表示文字数を制限する関数
  const truncateString = (str: string, num: number) => {
    return str.length <= num ? str : str.slice(0, num) + "...";
  };

  // 回答期限の表示形式を整える関数
  const formedDeadline = (inputData: string): string => {
    const date = new Date(inputData);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}年${month < 10 ? "0" : ""}${month}月${
      day < 10 ? "0" : ""
    }${day}日`;
  };

  return (
    <div className="flex flex-col items-center h-screen ">
      <table className="table-auto border border-collapse my-20 w-3/4">
        <thead>
          <tr>
            <th className="border p-4 bg-neutral-300">回答期日</th>
            <th className="border  bg-neutral-300">案件名</th>
            <th className="border  bg-neutral-300">案件概要</th>
            <th className="border  bg-neutral-300"></th>
          </tr>
        </thead>
        <tbody>
          {answerRequestList.map((project: ProjectType) => (
            <tr key={project.id}>
              <td className="border text-center p-3">
                {formedDeadline(project.deadline)}
              </td>
              <td className="border text-center px-4">
                {project.project.name}
              </td>
              <td className="border text-center px-4">
                {truncateString(project.project.detail, 30)}
              </td>
              <td className="border text-center px-4 ">
                {project.answered ? (
                  <Link
                    href={`result/${project.id}`}
                    data-testid={`linkButton${project.id}`}
                  >
                    <AnswerButton
                      answered={project.answered}
                      data-testid={`confirmButton${project.id}`}
                    />
                  </Link>
                ) : (
                  <Link
                    href={`testing/${project.id}`}
                    data-testid={`linkButton${project.id}`}
                  >
                    <AnswerButton
                      answered={project.answered}
                      data-testid={`confirmButton${project.id}`}
                    />
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
