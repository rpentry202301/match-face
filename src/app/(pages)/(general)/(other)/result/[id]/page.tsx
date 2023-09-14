import { AnswerContent } from "./answerContent";

const ResultPage = ({ params }: { params: { id: string } }) => {
  return (
    <div className="flex flex-col items-center">
      <AnswerContent project_id={Number(params.id)} />
    </div>
  );
};

export default ResultPage;
