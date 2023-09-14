import type { QuestionList } from "@/types/(general)/(other)/result/questions";
import { CurrentAnswer } from "./currentAnswer";

export const AnswerList = ({
  questionList,
}: {
  questionList: QuestionList[];
}) => {
  return (
    <>
      {questionList.map((question, index) => (
        <>
          {question.answerList[0].modelAnswerFl === false ? (
            <div key={index} className="py-5">
              <h3 className="text-xl">
                Q{index + 1}:{question.context}
              </h3>
              <CurrentAnswer question={question} />
            </div>
          ) : (
            <></>
          )}
        </>
      ))}
    </>
  );
};
