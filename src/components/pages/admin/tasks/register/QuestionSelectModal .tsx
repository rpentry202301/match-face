import QuestionSelectModalForm from "./parts/QuestionSelectModalForm";
import type { FetchQuestionModalData } from "@/types/admin/tasks/register/types";

const QuestionSelectModal = async () => {
  const fetcher = async (endPoint: string) => {
    const response = await fetch(`${process.env.BE_URL}/${endPoint}`, {
      cache: "no-cache",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  };

  const fetchModalData = async () => {
    const departments = await fetcher("departments");
    const skills = await fetcher("skills");
    const questions = await fetcher("questions");
    const projects = await fetcher("projects");

    return {
      departments: departments.departmentList,
      skills: skills.skillList,
      questions: questions.questionList,
      projects: projects.projectList,
    } as FetchQuestionModalData;
  };

  const fetchData = await fetchModalData();

  return (
    <div>
      <QuestionSelectModalForm fetchData={fetchData} />
    </div>
  );
};

export default QuestionSelectModal;
