import { project } from "@/const/testing";
import { QuestionList } from "./questionList";

export const ProjectContent = ({ id }: { id: number }) => {
  const currentProject = project.filter((project) => project.id === id);

  return (
    <div className="w-1/2 py-5">
      <h1 className="text-xl">{currentProject[0].name}</h1>
      <p className="text-lg">{currentProject[0].project_detail}</p>
      <QuestionList id={id} />
    </div>
  );
};
