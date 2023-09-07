import TasksPage from "@/app/(pages)/admin/(other)/tasks/page";
import { cleanup, render } from "@testing-library/react";
import { UserSelectProvider } from "@/hooks/store/context/UserSelectContext";
import { FilterProvider } from "@/hooks/store/context/TasksContext";

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
      <FilterProvider>
        <UserSelectProvider>
          <TasksPage />
        </UserSelectProvider>
      </FilterProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
