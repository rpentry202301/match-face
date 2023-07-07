import { ModelAnswer } from "@/const/result";

type Props = {
  project_id: number;
  question_id: number;
};

const ModelAnswerContent = ({ project_id, question_id }: Props) => {
  const currentModelAnswer = ModelAnswer.filter(
    (modelAnswer) =>
      modelAnswer.project_id === project_id && question_id === question_id
  );
  return (
    <>
      <div className="my-7 p-3 rounded-md bg-gray-200">
        <h3 className="text-xl mb-2 ">模範解答</h3>
        {currentModelAnswer[0].content}
      </div>
    </>
  );
};

export default ModelAnswerContent;
