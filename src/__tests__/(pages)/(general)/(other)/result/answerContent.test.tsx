import { render, screen } from "@testing-library/react";
import { AnswerContent } from "@/app/(pages)/(general)/(other)/result/[id]/answerContent";
import { useRouter } from "next/navigation";
import { AppRouterContextProviderMock } from "../../../../test_utils/app-router-context-provider-mock";

describe("AnswerContentコンポーネントのテスト", () => {
  const testData = {
    user_id: "user1",
    project_id: "1",
  };

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
