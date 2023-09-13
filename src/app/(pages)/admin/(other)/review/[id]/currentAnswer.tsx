import type { QuestionList } from "@/types/(general)/(other)/result/questions";
import ModelAnswerContent from "@/components/pages/general/result/ModelAnswer";

export const CurrentAnswer = ({ question }: { question: QuestionList }) => {
  console.log("question", question);

  return (
    <>
      {question.choiceList.length === 0 ? (
        <>
          <div
            id={`answer-${question.id}`}
            className="border border-gray p-3 mt-2 rounded-md shadow-md"
          >
            <h3 className="mb-2 text-xl">あなたの回答</h3>
            {question.answerList[0].context}
          </div>
          <ModelAnswerContent question={question} />
        </>
      ) : (
        <>
          <ul>
            {question.choiceList?.map((choice, index) => (
              <li key={index}>・{choice}</li>
            ))}
          </ul>
          <div
            id={`answer-${question.id}`}
            className="border border-gray p-3 mt-2 rounded-md shadow-md"
          >
            <h3 className="mb-2 text-xl">あなたの回答</h3>
            {question.answerList[0].context}
          </div>
          <ModelAnswerContent question={question} />
        </>
      )}
    </>
  );
};
