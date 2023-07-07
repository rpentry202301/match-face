import { question } from "@/const/testing";

export const QuestionList = ({ id }: { id: number }) => {
  const currentQuestion = question.filter(
    (question) => question.project_id === id
  );
  return (
    <>
      {currentQuestion.map((question, index) => (
        <div key={index} className="py-5">
          <h2>
            Q{index + 1}：{question.name}
          </h2>
          <p className="mt-2 mb-4">{question.content}</p>
          {question.type === "writing" ? (
            <>
              <label htmlFor={question.name}>
                <p>回答記入欄</p>
              </label>
              <textarea
                className="border border-black mt-1 w-full"
                name={question.name}
                id={question.name}
                cols={50}
                rows={6}
              ></textarea>
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
