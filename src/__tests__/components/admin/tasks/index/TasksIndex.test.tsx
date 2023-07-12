import TasksIndex from "@/components/pages/admin/tasks/index/TasksIndex";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("TaskIndex.tsx", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });

  it("レンダリング時", () => {
    const { container } = render(<TasksIndex />);
    expect(container).toMatchSnapshot();
  });
  it("新規タスク作成ボタンリンク", () => {
    render(<TasksIndex />);
    const LinkButton = screen.getByTestId("link_task_register");
    // console.log("LinkButton", LinkButton);
    expect(LinkButton).toHaveAttribute("href", "/admin/tasks/register");
  });
});
