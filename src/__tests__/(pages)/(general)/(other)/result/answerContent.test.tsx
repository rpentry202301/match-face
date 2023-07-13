import { render, screen } from "@testing-library/react";
import { AnswerContent } from "@/app/(pages)/(general)/(other)/result/[id]/answerContent";
import { AppRouterContextProviderMock } from "../../../../test_utils/app-router-context-provider-mock";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { project } from "@/const/testing";

const user = userEvent.setup();

describe("AnswerContentコンポーネントのテスト", () => {
  const testData = {
    user_id: "user1",
    project_id: "1",
    answerDate: "2023/7/6",
    projectTitle: project[0].name,
    projectContent: project[0].project_detail,
  };
  const push = jest.fn();
  render(
    <AppRouterContextProviderMock router={{ push }}>
      <AnswerContent
        user_id={testData.user_id}
        project_id={testData.project_id}
      />
    </AppRouterContextProviderMock>
  );

  test("回答日時が表示される", () => {
    const answerDate = screen.getByText(`回答日時:${testData.answerDate}`);
    expect(answerDate).toBeInTheDocument();
  });

  test("案件名・案件概要が表示される", () => {
    const projectTitle = screen.getByRole("heading", { level: 2 });
    expect(projectTitle).toHaveTextContent(`案件名：${testData.projectTitle}`);

    const projectContent = screen.getByText(testData.projectContent);
    expect(projectContent).toBeInTheDocument();
  });

  test("質問一覧へのボタンが正常に動く", async () => {
    const button = screen.getByRole("button", { name: "質問一覧へ" });
    expect(button).toBeInTheDocument();

    await user.click(button);

    expect(push).toHaveBeenCalledWith("/questions");
  });

  test("回答履歴一覧へのボタンが正常に動く", async () => {
    const button = screen.getByRole("button", { name: "回答履歴一覧へ" });
    expect(button).toBeInTheDocument();

    await user.click(button);
    expect(push).toHaveBeenCalledWith("/histories");
  });

  test("スナップショットテスト", () => {
    const push = jest.fn();

    const contents = render(
      <AppRouterContextProviderMock router={{ push }}>
        <AnswerContent
          user_id={testData.user_id}
          project_id={testData.project_id}
        />
      </AppRouterContextProviderMock>
    );
    expect(contents).toMatchSnapshot();
  });
});
