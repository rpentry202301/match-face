import TaskRegisterIndex from "@/components/pages/admin/tasks/register/TaskRegisterIndex";
import { render } from "@testing-library/react";
import { UserSelectProvider } from "@/hooks/store/context/UserSelectContext";
import { SelectedQuestionProvider } from "@/hooks/store/context/SelectedQuestionContext";

// useContextをモーダルで使用しているため、Providerを追加しています

describe("TaskRegisterIndex.tsx", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
  it("レンダリング時", () => {
    const { container } = render(
      <SelectedQuestionProvider>
        <UserSelectProvider>
          <TaskRegisterIndex />
        </UserSelectProvider>
      </SelectedQuestionProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
