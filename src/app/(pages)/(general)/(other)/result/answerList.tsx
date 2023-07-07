import { question } from "@/const/testing";
import { Answer } from "@/const/result";
import ModelAnswerContent from "./modelAnswer";

type Props = {
  project_id: number;
};

export const AnswerList = ({ project_id }: Props) => {
  const currentQuestion = question.filter(
    (question) => question.project_id === project_id
  );

  const currentAnswer = Answer.filter(
    (answer) => answer.project_id === project_id
  );

  return (
    <>
      {currentQuestion.map((question, index) => (
        <div key={index} className="py-5">
          <h3 className="text-xl">
            Q{index + 1}：{question.name}
          </h3>
          <p className="mt-2 mb-4">{question.content}</p>
          {question.type === "writing" ? (
            <>
              <div className="border border-gray p-3 mt-2 rounded-md shadow-md">
                <h3 className="mb-2 text-xl">あなたの回答</h3>
                {currentAnswer[index].content}
              </div>
            </>
          ) : (
            <>
              {question.choices?.map((choice, index) => (
                <div key={index}>
                  <input
                    id={`choice${index}`}
                    type="radio"
                    value={choice}
                    name={question.name}
                  />
                  <label htmlFor={`choice${index}`}>{choice}</label>
                </div>
              ))}
            </>
          )}
          <ModelAnswerContent
            project_id={project_id}
            question_id={question.id}
          />
        </div>
      ))}
    </>
  );
};
