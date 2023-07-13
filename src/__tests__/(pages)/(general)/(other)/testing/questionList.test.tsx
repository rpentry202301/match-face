import { QuestionList } from "@/app/(pages)/(general)/(other)/testing/[id]/questionList";
import { render, screen } from "@testing-library/react";
import { question } from "@/const/testing";
import "@testing-library/jest-dom";

const testData = {
  id: "1",
};

const currentQuestion = question.filter(
  (question) => question.project_id === testData.id
);

describe("QuestionListコンポーネントのテスト", () => {
  test("質問タイトルと詳細内容が表示される", () => {
    render(<QuestionList id={testData.id} />);
    // 質問タイトルと質問詳細内容がデータと一致する
    currentQuestion.map((question, index) => {
      const heading = screen.getByRole("heading", {
        level: 2,
        name: `Q${index + 1}:${question.name}`,
      });
      const content = document.querySelector(`#question-content-${index}`);

      expect(heading).toBeInTheDocument();
      expect(content).toHaveTextContent(`${question.content}`);
    });
  });
  test("type=writingの場合、解答欄が表示される", () => {
    render(<QuestionList id={testData.id} />);
    currentQuestion.map((question, index) => {
      if (question.type === "writing") {
        const title = document.querySelector(`#answer-title-${index}`);
        const textarea = document.querySelector(`#${question.name}`);
        expect(title).toBeInTheDocument();
        expect(textarea).toBeInTheDocument();
      }
    });
  });
  test("type=selectの場合、選択肢が表示される", () => {
    render(<QuestionList id={testData.id} />);
    currentQuestion.map((question, index) => {
      if (question.type === "select") {
        question.choices?.map((choice, index) => {
          const input = document.querySelector(`#choice-${index}`);
          const label = document.querySelector(`#label-${index}`);
          expect(input).toBeInTheDocument();
          expect(label).toBeInTheDocument();
        });
      }
    });
  });
  test("スナップショットテスト", () => {
    const { container } = render(<QuestionList id={testData.id} />);
    expect(container).toMatchSnapshot();
  });
});
