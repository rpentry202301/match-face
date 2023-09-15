import TaskRegisterIndex from "@/components/pages/admin/tasks/register/TaskRegisterIndex";
import { render } from "@testing-library/react";
import { UserSelectProvider } from "@/hooks/store/context/UserSelectContext";
import { SelectedQuestionProvider } from "@/hooks/store/context/SelectedQuestionContext";
import SelectUsers from "@/components/pages/admin/groups/register/SelectUsers";
import SelectQuestions from "@/components/pages/admin/tasks/register/parts/SelectQuestions";

// useContextをモーダルで使用しているため、Providerを追加しています
// asyncを使用しているコンポーネントがあるためテスト不可

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
          <TaskRegisterIndex id="1">
            <SelectUsers />
            <SelectQuestions />
          </TaskRegisterIndex>
        </UserSelectProvider>
      </SelectedQuestionProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
