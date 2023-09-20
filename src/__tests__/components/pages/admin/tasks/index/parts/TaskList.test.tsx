import TaskList from "@/components/pages/admin/tasks/index/parts/TaskList";
import { answer_requests } from "@/const/tasks";
import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("TaskList.tsx", () => {
  beforeAll(() => {
    jest.clearAllMocks();
    cleanup();
  });
  afterAll(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it("スナップショットテスト", () => {
    const { container } = render(
      <TaskList tasks={answer_requests.answerRequests} />
    );
    expect(container).toMatchSnapshot();
  });
  it("表示できるデータが存在しない", () => {
    cleanup();
    render(<TaskList tasks={[]} />);

    const noDatatxt = screen.getByText("表示するデータがありません");
    expect(noDatatxt).toBeInTheDocument();
    const dataTable = screen.queryByTestId("data-table");
    expect(dataTable).toBeNull();
  });
});
