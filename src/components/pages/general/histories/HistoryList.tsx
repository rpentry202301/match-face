import GrayButton from "@/components/ui/button/GrayButton";
import OrangeButton from "@/components/ui/button/OrangeButton";
import { data } from "@/const/histories";
import Link from "next/link";
import { useRouter } from "next/router";

type ProjectData = {
  id: string;
  comment_status: boolean;
  project_name: string;
  project_detail: string;
  answer_date: string;
}[];

const HistoryList = () => {
  const router = useRouter();
  // const response = await fetch('http://localhost:3000/api');
  // if (!response.ok) throw new Error('Failed to fetch data');
  // const projectData: ProjectData = await response.json();
  const projectData: ProjectData = data;
  return (
    <div>
      <table className="table-auto border border-collapse my-20">
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
          {projectData.map((project) => (
            <tr key={project.id}>
              <td className="border text-center p-3">
                {project.comment_status ? (
                  <OrangeButton
                    label={"新着"}
                    className="w-15 rounded py-2 px-4 text-white text-sm"
                  />
                ) : (
                  ""
                )}
              </td>
              <td className="border text-center p-3">{project.answer_date}</td>
              <td className="border text-center">{project.project_name}</td>
              <td className="border text-center">{project.project_detail}</td>
              <td className="border text-center px-4">
                {/* Linkでもできるのでは？ */}
                <GrayButton
                  label={"詳細"}
                  className="w-15 rounded py-2 px-4 text-sm"
                  value={project.id}
                  onClick={() => {
                    router.push({
                      pathname: "/result/",
                      query: { id: project.id },
                    });
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default HistoryList;
