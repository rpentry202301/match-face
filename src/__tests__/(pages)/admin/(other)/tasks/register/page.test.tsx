import TaskRegisterPage from "@/app/(pages)/admin/(other)/tasks/register/page";
import { render } from "@testing-library/react";
import { UserSelectProvider } from "@/hooks/store/context/UserSelectContext";
import { SelectedQuestionProvider } from "@/hooks/store/context/SelectedQuestionContext";

// useContextをモーダルで使用しているため、Providerを追加しています
// "next/headers"のimportでエラーが起きる
// asyncコンポーネントを含むためテスト出来ず

describe('タスク一覧画面', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(
      <SelectedQuestionProvider>
        <UserSelectProvider>
          <TaskRegisterPage />
        </UserSelectProvider>
      </SelectedQuestionProvider>
    );
  });
  afterAll(() => {
    jest.clearAllMocks();
  });

  it("レンダリング時", () => {
    const { container } = render(
      <SelectedQuestionProvider>
        <UserSelectProvider>
          <TaskRegisterPage />
        </UserSelectProvider>
      </SelectedQuestionProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
