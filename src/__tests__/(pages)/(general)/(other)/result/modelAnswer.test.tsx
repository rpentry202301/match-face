import ModelAnswerContent from "@/components/pages/general/result/ModelAnswer";
import { render, screen } from "@testing-library/react";
import { ModelAnswer } from "@/const/result";
import "@testing-library/jest-dom";

const testData = {
  project_id: 1,
  question_id: 1,
  modelAnswerContent: ModelAnswer[0].content,
};

describe("ModelAnswerContentコンポーネントのテスト", () => {
  test("模範回答が正しく表示される", () => {
    render(
      <ModelAnswerContent
        project_id={testData.project_id}
        question_id={testData.question_id}
      />
    );

    const heading = screen.getByRole("heading");
    expect(heading).toHaveTextContent("模範解答");

    const modelAnswer = document.querySelector("#modelAnswer");
    expect(modelAnswer).toHaveTextContent(testData.modelAnswerContent);
  });

  test("スナップショットテスト", () => {
    const content = render(
      <ModelAnswerContent
        project_id={testData.project_id}
        question_id={testData.question_id}
      />
    );
    expect(content).toMatchSnapshot();
  });
});
