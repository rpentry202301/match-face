"use client";

import GrayButton from "@/components/ui/button/GrayButton";
import Link from "next/link";
import { memo } from "react";
import type { Data } from "@/const/histories";

interface HistoryListProps {
  month?: string;
  skill?: number[] | undefined;
  selectProject?: Data;
}

const HistoryList: React.FC<HistoryListProps> = memo(
  // 引数が渡されなかった場合のデフォルト引数（=[]）
  ({ selectProject = [] }) => {
    // timestampからyyy/mmの形にする
    // const timestamp = projects[0].answer_update_at;
    // const newDate = new Date(timestamp);
    // const getYear = newDate.getFullYear();
    // const getMonth = newDate.getMonth() + 1;
    // const formattedDate = `${getYear}/${String(getMonth).padStart(2, "0")}`;
    // console.log("月", formattedDate);

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
                  {project.comment_created_at ? (
                    <span className=" bg-orange text-white p-2 w-40 h-auto w-15 rounded py-1 px-2 text-xs">
                      新着
                    </span>
                  ) : (
                    ""
                  )}
                </td>
                <td className="border text-center p-3">
                  {project.answer_update_at}
                </td>
                <td className="border text-center px-4">{project.name}</td>

                <td
                  className="border text-center px-4 "
                  data-test={`projectDetail${project.id}`}
                >
                  {truncateString(project.detail, 30)}
                </td>
                <td className="border text-center px-4">
                  <Link href={`result/${project.id}`}>
                    <GrayButton
                      label={"詳細"}
                      className="w-15 rounded py-1 px-2 text-xs"
                      value={project.id}
                    />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
);
HistoryList.displayName = "HistoryList";
export default HistoryList;
