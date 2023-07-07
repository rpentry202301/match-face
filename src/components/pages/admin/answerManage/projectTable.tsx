"use client";
import ProjectTableData from "@/const/projectTable";
import WhiteButton from "@/components/ui/button/WhiteButton";
import { useState } from "react";

const ProjectTable = () => {
  const [page, setPage] = useState(0);

  const pageAmount =
    ProjectTableData.length % 10 === 0
      ? ProjectTableData.length / 10
      : Math.floor(ProjectTableData.length / 10) + 1;

  const pageArr = Array(pageAmount)
    .fill(0)
    .map((num, index) => index);

  const pagingData = ProjectTableData.slice(page * 10, page * 10 + 10);

  return (
    <>
      <table className="w-3/4 border-2">
        <tbody>
          <tr className="border-2 border-current bg-light-gray">
            <th className="w-1/5 border-2 py-4">最終編集日</th>
            <th className="w-1/5 border-2">案件名</th>
            <th className="w-2/5 border-2">案件概要</th>
            <th className="w-1/5 border-2"></th>
          </tr>
          {pagingData.map((data) => {
            return (
              <>
                <tr>
                  <td className="border-2 py-6 text-center">
                    {data.edit_date}
                  </td>
                  <td className="border-2 text-center">{data.project_name}</td>
                  <td className="border-2 text-center">
                    {data.project_detail.slice(0, 20)}
                  </td>
                  <td className="border-2">
                    <div className="flex items-center justify-evenly">
                      <WhiteButton label="編集" className="text-xs py-1 px-5" />
                      <WhiteButton label="削除" className="text-xs py-1 px-5" />
                    </div>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
      <div className="w-5/12 max-w-5/12 flex justify-center my-7">
        <ul className="flex">
          {pageArr.map((num) => (
            <li key={`page_${num}`}>
              <button
                className={
                  num == page
                    ? "my-2 mx-4 py-1 px-2 bg-deep-gray rounded-full pointer-events-none"
                    : "my-2 mx-4 py-1 px-3 rounded-full"
                }
                type="button"
                onClick={() => {
                  setPage(num);
                  window.scroll({ top: 0 });
                }}
              >
                {num + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ProjectTable;
