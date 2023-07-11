import TaskList from "@/components/pages/admin/tasks/index/parts/TaskList";
import { render } from "@testing-library/react";

describe("TaskList.tsx", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });

  it("レンダリング時", () => {
    const { container } = render(<TaskList />);
    expect(container).toMatchSnapshot();
  });
});
