import TasksPage from "@/app/(pages)/admin/(other)/tasks/page";
import { render } from "@testing-library/react";
import { UserSelectProvider } from "@/hooks/store/context/UserSelectContext";

// useContextをモーダルで使用しているため、Providerを追加しています

describe('タスク一覧画面', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(
      <UserSelectProvider>
        <TasksPage />
      </UserSelectProvider>
    );
  });
  afterAll(() => {
    jest.clearAllMocks();
  });

  it("レンダリング時", () => {
    const { container } = render(
      <UserSelectProvider>
        <TasksPage />
      </UserSelectProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
