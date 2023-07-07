import { AnswerContent } from "./answerContent";

const ResultPage = () => {
  const data = {
    user_id: "user1",
    project_id: 1,
  };

  return (
    <div className="flex flex-col items-center">
      <AnswerContent user_id={data.user_id} project_id={data.project_id} />
    </div>
  );
};

export default ResultPage;
