import { QuestionList } from "@/types/(general)/(other)/result/questions";

const ModelAnswerContent = ({
  questionList,
  index,
}: {
  questionList: QuestionList;
  index: number;
}) => {
  // 模範回答の配列
  const modelAnswers = questionList.map((question) =>
    question.answerList.filter((answer) => answer.modelAnswerFl === true)
  );

  return (
    <>
      <div id="modelAnswer" className="my-7 p-3 rounded-md bg-light-gray">
        <h3 className="text-xl mb-2 ">模範解答</h3>
        {modelAnswers[index][0].context}
      </div>
    </>
  );
};

export default ModelAnswerContent;
