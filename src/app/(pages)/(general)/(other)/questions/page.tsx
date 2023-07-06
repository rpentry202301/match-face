import { data } from "src/const/questions";

type ProjectData = {
  id: string;
  project_name: string;
  project_detail: string;
  answer_deadline: string;
  answer_status: boolean;
}[];

const QuestionsPage = () => {
  const response = data;
  // const projectData = response.json()
  const projectData: ProjectData = response;
  return (
    <div className="flex flex-col items-center h-screen ">
      <table className="table-auto border border-collapse my-20 w-3/4">
        <thead>
          <tr>
            <th className="border p-4">回答期日</th>
            <th className="border">案件名</th>
            <th className="border">案件概要</th>
            <th className="border"></th>
          </tr>
        </thead>
        <tbody>
          {projectData.map((project) => (
            <tr key={project.id}>
              <td className="border p-3">{project.answer_deadline}</td>
              <td className="border">{project.project_name}</td>
              <td className="border">{project.project_detail}</td>
              <td className="border">
                <button>回答する</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionsPage;
