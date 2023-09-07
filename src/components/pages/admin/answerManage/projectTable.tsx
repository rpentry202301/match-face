"use client";
import ProjectTableData from "@/const/projectTable";
import WhiteButton from "@/components/ui/button/WhiteButton";
import { ProjectsResponse } from "@/const/projectTable";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRefine } from "@/hooks/store/context/HandleQuestionContext";

type Project = {
  createdAt: string;
  createdUser: string;
  deleted: boolean;
  departmentId: number;
  detail: string;
  enterpriseId: number;
  id: number;
  name: string;
  questionList: any[];
  updateAt: string;
  updateUser: string;
};

const ProjectTable = () => {
  const [page, setPage] = useState(0);
  const [data, setData] = useState<Project[]>([]);
  const [refine, setRefine] = useRefine();
  // console.log("projectTable", refine);

  useEffect(() => {
    // console.log(refine);
    const url = "http://localhost:8080/qa_system_api/projects";
    const getData = async (url: string): Promise<Project[]> => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response not OK");
        }
        const res: ProjectsResponse = await response.json();
        return res.projectList;
      } catch (error) {
        console.error("Error fetching data:", error);
        return [];
      }
    };

    const filterData = async () => {
      const nonFilter = await getData(url);
      // console.log(filter)
      const keywordParam = `searchKeyword=${encodeURIComponent(
        refine.word[0]
      )}`;
      const departmentParams = refine.department
        .map((id) => `departmentId=${id}`)
        .join("&");
      // refine.departmentとrefine.wordがが空の場合、すべてのデータを表示
      if (refine.department.length === 0 && refine.word.length === 0) {
        setData(nonFilter);
        return;
      } else if (refine.department.length === 0) {
        const wordFilter = await getData(`${url}?${keywordParam}`);
        // console.log(wordFilter);
        setData(wordFilter);
      } else if (refine.word.length === 0) {
        const departmentFilter = await getData(`${url}?${departmentParams}`);
        // console.log(departmentFilter);
        setData(departmentFilter);
      } else {
        const allFilter = await getData(
          `${url}?${keywordParam}&${departmentParams}`
        );
        // console.log(allFilter);
        setData(allFilter);
      }
    };
    filterData();
  }, [refine]);

  const pageAmount =
    data.length % 10 === 0
      ? data.length / 10
      : Math.floor(data.length / 10) + 1;

  const pageArr = Array(pageAmount)
    .fill(0)
    .map((num, index) => index);

  const pagingData = data.slice(page * 10, page * 10 + 10);

  return (
    <>
      <table className="w-4/5 border-2" data-testid="projectTable">
        <tbody>
          <tr className="border-2 border-current bg-light-gray">
            <th className="w-1/5 border-2 py-4">最終編集日</th>
            <th className="w-1/5 border-2">案件名</th>
            <th className="w-2/5 border-2">案件概要</th>
            <th className="w-1/5 border-2"></th>
          </tr>
          {pagingData.map((data) => {
            const datePortion = data.createdAt.split("T")[0];
            const [year, month, day] = datePortion.split("-");
            const formattedDate = `${year}/${parseInt(month)}/${parseInt(day)}`;
            return (
              <tr key={data.id}>
                <td className="border-2 py-6 text-center">{formattedDate}</td>
                <td
                  className="border-2 text-center"
                  data-testid={`${data.name}`}
                >
                  {data.name}
                </td>
                <td className="border-2 text-center">
                  {data.detail.slice(0, 20)}
                </td>
                <td className="border-2">
                  <div className="flex items-center justify-evenly">
                    <Link
                      href={`/admin/handle-question/edit/${data.id}`}
                      data-testid={`editButton_${data.id}`}
                    >
                      <WhiteButton label="編集" className="text-xs py-1 px-5" />
                    </Link>
                    <WhiteButton label="削除" className="text-xs py-1 px-5" />
                  </div>
                </td>
              </tr>
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
