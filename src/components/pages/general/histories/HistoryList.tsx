"use client";

import GrayButton from "@/components/ui/button/GrayButton";
import Link from "next/link";
import { memo, useEffect, useState } from "react";
import type { DataType } from "@/const/histories";

interface HistoryListProps {
  month?: string;
  skill?: number[] | undefined;
}

const HistoryList = memo(({ click, month, skill }) => {
  const [selectProject, setSelectProject] = useState([]);

  useEffect(() => {
    async function getSelectedData() {
      const userId = 1;
      const response = await fetch("http://localhost:3000/api/histories", {
        cache: "no-store",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          month: month,
          skill: skill,
        }),
      });
      if (!response.ok) throw new Error("Failed to fetch data");
      const FetchData = await response.json();
      const selectProject = FetchData.answerRequestList;
      setSelectProject(selectProject);
      console.log("取得したデータ", selectProject, month, skill);
    }
    getSelectedData();
  }, [click]);

  const truncateString = (str: any, num: any) => {
    return str.length <= num ? str : str.slice(0, num) + "...";
  };

  return (
    <div>
      <table className="table-auto border border-collapse my-20 w-[80vw]">
        <thead>
          <tr>
            <th className="border p-4 bg-neutral-300">コメント</th>
            <th className="border  bg-neutral-300">回答日</th>
            <th className="border  bg-neutral-300">案件名</th>
            <th className="border  bg-neutral-300">案件概要</th>
            <th className="border  bg-neutral-300"></th>
          </tr>
        </thead>
        <tbody>
          {selectProject.map((project) => (
            <tr key={project.id}>
              <td className="border text-center p-3">
                {project.comment ? (
                  <span className=" bg-orange text-white p-2 w-40 h-auto w-15 rounded py-1 px-2 text-xs">
                    新着
                  </span>
                ) : (
                  ""
                )}
              </td>
              <td className="border text-center p-3">{project.updateAt}</td>
              <td className="border text-center px-4">
                {project.project.name}
              </td>

              <td
                className="border text-center px-4 "
                data-test={`projectDetail${project.id}`}
              >
                {truncateString(project.project.detail, 30)}
              </td>
              <td className="border text-center px-4">
                <Link href={`result/${project.project.id}`}>
                  <GrayButton
                    label={"詳細"}
                    className="w-15 rounded py-1 px-2 text-xs"
                    value={project.project.id}
                  />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

HistoryList.displayName = "HistoryList";
export default HistoryList;
