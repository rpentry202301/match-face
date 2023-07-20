import { AnswerList } from "@/app/(pages)/(general)/(other)/result/[id]/answerList";
import { render, screen } from "@testing-library/react";
import { question } from "@/const/testing";
import { Answer } from "@/const/result";
import "@testing-library/jest-dom";

const testData = {
  project_id: 1,
};

const currentQuestion = question.filter(
  (question) => question.project_id === testData.project_id
);

const currentAnswer = Answer.filter(
  (answer) => answer.project_id === testData.project_id
);

describe("AnswerListコンポーネントのテスト", () => {
  test("回答内容が表示される", () => {
    render(<AnswerList project_id={testData.project_id} />);

    // 質問のタイトル・内容が一致する
    for (let i = 0; i <= 2; i++) {
      const question_title = screen.getByRole("heading", {
        level: 3,
        name: `Q${i + 1}:${currentQuestion[i].name}`,
      });
      const question_content = document.querySelector(`#content-${i + 1}`);

      expect(question_title).toBeInTheDocument();
      expect(question_content).toHaveTextContent(currentQuestion[i].content);
    }

    // 回答の表示数と質問の数が一致する
    const answer_title = screen.getAllByRole("heading", {
      level: 3,
      name: "あなたの回答",
    });
    expect(answer_title).toHaveLength(3);

    // 回答内容が一致する
    for (let i = 0; i <= 2; i++) {
      const answer_content = document.querySelector(`#answer-${i + 1}`);
      expect(answer_content).toHaveTextContent(currentAnswer[i].content);
    }
  });

  test("スナップショットテスト", () => {
    const contents = render(<AnswerList project_id={testData.project_id} />);
    expect(contents).toMatchSnapshot();
  });
});
