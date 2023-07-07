import AnswerButton from "@/components/pages/general/questions/AnswerButton";
import { data } from "@/const/questions";

type ProjectData = {
  id: string;
  project_name: string;
  project_detail: string;
  answer_deadline: string;
  answer_status: boolean;
}[];

const QuestionsPage = () => {
  // const response = await fetch('http://localhost:3000/api');
  // if (!response.ok) throw new Error('Failed to fetch data');
  // const projectData: ProjectData = await response.json();
  const projectData: ProjectData = data;
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
          {projectData.map((project) => (
            <tr key={project.id}>
              <td className="border text-center p-3">
                {project.answer_deadline}
              </td>
              <td className="border text-center">{project.project_name}</td>
              <td className="border text-center">{project.project_detail}</td>
              <td className="border text-center">
                <AnswerButton answered={project.answer_status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionsPage;
