import { QuestionList } from "@/types/(general)/(other)/result/questions";

const ModelAnswerContent = ({ question }: { question: QuestionList }) => {
  return (
    <>
      <div id="modelAnswer" className="my-7 p-3 rounded-md bg-light-gray">
        <h3 className="text-xl mb-2 ">模範解答</h3>
        {question.answerList[0].context}
      </div>
    </>
  );
};

export default ModelAnswerContent;
