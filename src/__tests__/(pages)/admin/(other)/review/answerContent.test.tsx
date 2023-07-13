import { AnswerContent } from "@/app/(pages)/admin/(other)/review/[id]/answerContent";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppRouterContextProviderMock } from "@/__tests__/test_utils/app-router-context-provider-mock";
import "@testing-library/jest-dom";
import { Answer } from "@/const/review";
import { project } from "@/const/testing";
import answerEditData from "@/const/answerEdit";
import { title } from "process";

const testData = {
  user_id: "user1",
  project_id: "1",
  admin_id: "adminuser",
};

const user = userEvent.setup();
const currentProject = project.filter(
  (project) => project.id === testData.project_id
);
const currentAnswer = Answer.filter(
  (answer) => answer.project_id == testData.project_id
);

describe("AnswerContentコンポーネントのテスト", () => {
  const push = jest.fn();
  render(
    <AppRouterContextProviderMock router={{ push }}>
      <AnswerContent
        user_id={testData.user_id}
        project_id={testData.project_id}
        admin_id={testData.admin_id}
      />
    </AppRouterContextProviderMock>
  );
  test("回答日時・案件名・案件詳細を表示する", () => {
    //回答日時の表示
    const answer_date = screen.getByText(
      `回答日時:${currentAnswer[0].answer_date.toLocaleDateString()}`
    );
    expect(answer_date).toBeInTheDocument();
    //案件名の表示
    const title = screen.getByRole("heading", {
      level: 2,
      name: `案件名:${currentProject[0].name}`,
    });
    expect(title).toBeInTheDocument();

    //案件詳細の表示
    const content = screen.getByText(currentProject[0].project_detail);
    expect(content).toBeInTheDocument();
  });

  test("モーダルの開閉", async () => {
    // ボタンをクリックする前はモーダルは閉じている
    const modal = document.querySelector("#comment-modal");
    expect(modal).not.toBeInTheDocument();

    // ボタンをクリックするとモーダルが開く
    const button = screen.getByRole("button", { name: "コメントを送信する" });
    await user.click(button);
    const modal_open = document.querySelector("#comment-modal");
    expect(modal_open).toBeInTheDocument();

    //キャンセルボタンをクリックするとモーダルが閉じる
    const cancel = screen.getByRole("button", { name: "キャンセル" });
    await user.click(cancel);
    const modal_close = document.querySelector("#comment-modal");
    expect(modal_close).not.toBeInTheDocument();
  });

  test("回答履歴一覧へ戻るボタンをクリックすると、/admmin/historiesへ遷移する", async () => {
    const button = screen.getByRole("button", {
      name: "回答履歴一覧へ戻る",
    });
    await user.click(button);

    expect(push).toHaveBeenCalledWith("/admin/histories");
  });

  test("スナップショットテスト", () => {
    const { container } = render(
      <AppRouterContextProviderMock router={{ push }}>
        <AnswerContent
          user_id={testData.user_id}
          project_id={testData.project_id}
          admin_id={testData.admin_id}
        />
      </AppRouterContextProviderMock>
    );
    expect(container).toMatchSnapshot();
  });
});
