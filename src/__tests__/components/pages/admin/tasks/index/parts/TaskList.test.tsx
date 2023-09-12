import TaskList from "@/components/pages/admin/tasks/index/parts/TaskList";
import { answer_requests } from "@/const/tasks";
import { cleanup, render } from "@testing-library/react";

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
});
