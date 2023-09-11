import TasksPage from "@/app/(pages)/admin/(other)/tasks/page";
import { cleanup, render } from "@testing-library/react";
import { UserSelectProvider } from "@/hooks/store/context/UserSelectContext";

// useContextをモーダルで使用しているため、Providerを追加しています

describe("タスク一覧画面", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    cleanup();
  });
  afterAll(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it("レンダリング時", () => {
    const { container } = render(
        <UserSelectProvider>
          <TasksPage searchParams={{departmentId: "", searchKeyword: ""}}/>
        </UserSelectProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
