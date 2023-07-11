import type { Question } from "@/const/projectTable";

interface QuestionListProps {
  questions: Question[];
}

const QuestionList = (props: QuestionListProps) => {
  const { questions } = props;
  return (
    <>
      {questions.map((data) => {
        if (data.answer_example) {
          return (
            <div key={data.question_id}>
              <h2>Q{data.question_id}.</h2>
              <textarea
                name="question"
                id="question"
                value={data.question}
                className="border-deep-gray"
              ></textarea>
              <label htmlFor="answer_ex">回答例</label>
              <textarea
                name="answer_ex"
                id="answer_ex"
                value={data.answer_example}
                className="border-deep-gray"
              ></textarea>
            </div>
          );
        } else if (data.answer) {
          return (
            <div key={data.question_id}>
              <h2>Q{data.question_id}.</h2>
            </div>
          );
        }
      })}
    </>
  );
};

export default QuestionList;
