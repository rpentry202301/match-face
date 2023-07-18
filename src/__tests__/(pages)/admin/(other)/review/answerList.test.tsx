import { AnswerList } from "@/app/(pages)/admin/(other)/review/[id]/answerList";
import { render, screen } from "@testing-library/react";
import { question } from "@/const/testing";
import { Answer } from "@/const/review";
import { User } from "@/const/review";
import "@testing-library/jest-dom";

const testData = {
  project_id: "1",
  user_id: "user1",
};

const currentQuestion = question.filter(
  (question) => question.project_id === testData.project_id
);

const currentAnswer = Answer.filter(
  (answer) => answer.project_id === testData.project_id
);

describe("AnswerListコンポーネントのテスト", () => {
  render(
    <AnswerList project_id={testData.project_id} user_id={testData.user_id} />
  );

  test("回答内容が表示される", () => {
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

    // 回答内容が一致する
    for (let i = 0; i <= 2; i++) {
      const answer_content = document.querySelector(`#answer-${i}`);
      expect(answer_content).toHaveTextContent(currentAnswer[i].content);
    }
  });

  test("解答者の名前が表示される", () => {
    const answerUser = User.filter((user) => user.id === testData.user_id);

    const userName = screen.getAllByRole("heading", {
      name: `${answerUser[0].name}の解答`,
      hidden: true,
    });
    expect(userName).toHaveLength(currentQuestion.length);
  });

  test("スナップショットテスト", () => {
    const { container } = render(
      <AnswerList project_id={testData.project_id} user_id={testData.user_id} />
    );
    expect(container).toMatchSnapshot();
  });
});
