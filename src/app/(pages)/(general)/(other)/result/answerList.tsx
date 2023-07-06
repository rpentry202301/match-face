import { question } from "@/const/testing";
import TextArea from "@/components/ui/TextArea";

export const AnswerList = ({ id }: { id: number }) => {
  const currentQuestion = question.filter(
    (question) => question.project_id === id
  );
  return (
    <>
      {currentQuestion.map((question, index) => (
        <div key={index} className="py-5">
          <h3>
            Q{index + 1}：{question.name}
          </h3>
          <p className="mt-2 mb-4">{question.content}</p>
          {question.type === "writing" ? (
            <>
              <label htmlFor={question.name}>
                <p>あなたの回答</p>
              </label>
              <TextArea
                name={question.name}
                id={question.name}
                cols={50}
                rows={6}
              />
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
        </div>
      ))}
    </>
  );
};
