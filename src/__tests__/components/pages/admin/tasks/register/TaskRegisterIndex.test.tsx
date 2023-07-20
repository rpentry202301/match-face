import TaskRegisterIndex from "@/components/pages/admin/tasks/register/TaskRegisterIndex";
import { render } from "@testing-library/react";
import { UserSelectProvider } from "@/hooks/store/context/UserSelectContext";

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
      <UserSelectProvider>
        <TaskRegisterIndex />
      </UserSelectProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
