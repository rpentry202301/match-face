import GrayButton from "@/components/ui/button/GrayButton";
import OrangeButton from "@/components/ui/button/OrangeButton";
import { data } from "src/const/histories";

type ProjectData = {
  id: string;
  comment_status: boolean;
  project_name: string;
  project_detail: string;
  answer_date: string;
}[];

const HistoriesPage = () => {
  const response = data;
  // const projectData = response.json()
  const projectData: ProjectData = response;
  return (
    <div className="flex flex-col items-center h-screen ">
      <table className="table-auto border border-collapse my-20 w-3/4">
        <thead>
          <tr>
            <th className="border p-4 bg-neutral-300">コメント</th>
            <th className="border p-4 bg-neutral-300">回答日</th>
            <th className="border  bg-neutral-300">案件名</th>
            <th className="border  bg-neutral-300">案件概要</th>
            <th className="border  bg-neutral-300"></th>
          </tr>
        </thead>
        <tbody>
          {projectData.map((project) => (
            <tr key={project.id}>
              <td className="border text-center p-3">
                <OrangeButton
                  label={"新着"}
                  className="bg-orange drop-shadow-lg hover:saturate-150 active:drop-shadow-none active:shadow-inner hover:bg-depp-orange active:bg-depp-orange text-white rounded-xl w-20 h-8 text-lg'"
                />
                {project.comment_status}
              </td>
              <td className="border text-center p-3">{project.answer_date}</td>
              <td className="border text-center">{project.project_name}</td>
              <td className="border text-center">{project.project_detail}</td>
              <td className="border text-center">
                <GrayButton label={"詳細"} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoriesPage;
