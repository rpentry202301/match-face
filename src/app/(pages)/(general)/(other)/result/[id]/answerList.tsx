import ModelAnswerContent from "@/components/pages/general/result/ModelAnswer";
import type { QuestionList } from "@/types/(general)/(other)/result/questions";

export const AnswerList = ({
  questionList,
}: {
  questionList: QuestionList;
}) => {
  // 回答の配列
  const userAnswers = questionList.map((question) =>
    question.answerList.filter((answer) => answer.modelAnswerFl === false)
  );

  return (
    <>
      {questionList.map((question, index) => (
        <div key={index} className="py-5">
          <h3 className="text-xl">
            Q{index + 1}:{question.context}
          </h3>
          {/* 選択問題ではない場合 */}
          {question.choiceList.length === 0 ? (
            <div
              id={`answer-${index + 1}`}
              className="border border-gray p-3 mt-2 rounded-md shadow-md"
            >
              <h3 className="mb-2 text-xl">あなたの回答</h3>
              {userAnswers[index][0].context}
            </div>
          ) : (
            // 選択問題の場合
            <>
              <ul>
                {question.choiceList?.map((choice, index) => (
                  <li key={index}>・{choice}</li>
                ))}
              </ul>
              <div
                id={`answer-${index + 1}`}
                className="border border-gray p-3 mt-5 rounded-md shadow-md"
              >
                <h3 className="mb-2 text-xl">あなたの回答</h3>
                {userAnswers[index][0].context}
              </div>
            </>
          )}
          <ModelAnswerContent questionList={questionList} index={index} />
        </div>
      ))}
    </>
  );
};
