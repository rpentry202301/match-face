import { question } from "@/const/testing";

export const QuestionList = ({ id }: { id: number }) => {
  const currentQuestion = question.filter(
    (question) => question.project_id === id
  );
  return (
    <>
      {currentQuestion.map((question, index) => (
        <div key={index} className="py-5">
          <h2>{question.name}</h2>
          <p>{question.content}</p>
          <textarea
            className="border border-black my-5 w-full"
            name={question.name}
            id={question.name}
            cols={50}
            rows={10}
          ></textarea>
        </div>
      ))}
    </>
  );
};
