import TasksIndex from "@/components/pages/admin/tasks/index/TasksIndex";
import { render } from "@testing-library/react";

describe("TaskIndex.tsx", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(<TasksIndex />);
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
  it("レンダリング時", () => {
    const { container } = render(<TasksIndex />);
    expect(container).toMatchSnapshot();
  });
});
