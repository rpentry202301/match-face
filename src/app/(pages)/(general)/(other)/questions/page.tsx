import AnswerButton from "@/components/pages/general/questions/AnswerButton";
import Link from "next/link";
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  PromiseLikeOfReactNode,
} from "react";

type ProjectType = {
  id: Key;
  deadline: string;
  project: {
    name: string;
    detail: string;
  };
  answered: boolean;
};

// 仮ユーザーID
const userId = 1;

const QuestionsPage = async () => {
  const response = await fetch("http://localhost:3000/api", {
    cache: "no-store",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: userId,
    }),
  });
  if (!response.ok) throw new Error("Failed to fetch data");
  const FetchData = await response.json();
  const answerRequestList = FetchData.answerRequestList;
  // console.log("取得したデータ", answerRequestList);

  //  案件詳細の文字数制限
  const truncateString = (str: string, num: number) => {
    return str.length <= num ? str : str.slice(0, num) + "...";
  };

  // 回答期限の表示
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
                    data-testid={`confirmButton${project.id}`}
                  >
                    <AnswerButton answered={project.answered} />
                  </Link>
                ) : (
                  <Link href={`testing/${project.id}`}>
                    <AnswerButton answered={project.answered} />
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

export default QuestionsPage;
