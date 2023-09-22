import { QuestionList as Questions } from "@/types/(general)/(other)/result/questions";

export const QuestionList = ({ questions }: { questions: Questions[] }) => {
  return (
    <>
      {questions.map((question, index) => (
        <div key={index} className="py-5">
          <h2>
            Q{index + 1}:{question.context}
          </h2>
          <>
            <label htmlFor={question.context}>
              <p id={`answer-title-${index}`}>解答記入欄</p>
            </label>
            <textarea
              className="border border-black mt-1 w-full"
              name={question.context}
              id={question.context}
              cols={50}
              rows={6}
            ></textarea>
          </>
        </div>
      ))}
    </>
  );
};
