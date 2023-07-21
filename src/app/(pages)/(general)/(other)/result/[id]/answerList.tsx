import { question } from "@/const/testing";
import { Answer } from "@/const/result";
import ModelAnswerContent from "@/components/pages/general/result/ModelAnswer";

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
            Q{index + 1}:{question.name}
          </h3>
          <p id={`content-${index + 1}`} className="mt-2 mb-4">
            {question.content}
          </p>
          {question.type === "writing" ? (
            <div
              id={`answer-${index + 1}`}
              className="border border-gray p-3 mt-2 rounded-md shadow-md"
            >
              <h3 className="mb-2 text-xl">あなたの回答</h3>
              {currentAnswer[index].content}
            </div>
          ) : (
            <>
              <ul>
                {question.choices?.map((choice, index) => (
                  <li key={index}>・{choice}</li>
                ))}
              </ul>
              <div
                id={`answer-${index + 1}`}
                className="border border-gray p-3 mt-5 rounded-md shadow-md"
              >
                <h3 className="mb-2 text-xl">あなたの回答</h3>
                {currentAnswer[index].content}
              </div>
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
