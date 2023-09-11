import TasksIndex from "@/components/pages/admin/tasks/index/TasksIndex";
import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { departments } from "@/const/tasks";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

const mockSearchParamsFn = (departmentId: string, searchKeyword: string) => ({
  departmentId: departmentId,
  searchKeyword: searchKeyword,
});

describe("TaskIndex.tsx", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    cleanup();
  });
  afterAll(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it("新規タスク作成ボタンリンク", () => {
    render(<TasksIndex searchParams={mockSearchParamsFn("", "")} />);
    const LinkButton = screen.getByTestId("link_task_register");
    // console.log("LinkButton", LinkButton);
    expect(LinkButton).toHaveAttribute("href", "/admin/tasks/register");
  });
});
