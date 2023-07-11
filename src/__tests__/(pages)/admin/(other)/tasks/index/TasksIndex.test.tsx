import TasksIndex from "@/components/pages/admin/tasks/index/TasksIndex";
import { render } from "@testing-library/react";

describe('"/admin/tasks/"ページのテスト', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
  it("描画テスト", () => {
    const { container } = render(<TasksIndex />);
    expect(container).toMatchSnapshot();
  });
});
