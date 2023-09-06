import TaskList from "@/components/pages/admin/tasks/index/parts/TaskList";
import { cleanup, render, screen } from "@testing-library/react";
import { tasks } from "@/const/tasks";
import { FilterProvider, FilterType } from "@/hooks/store/context/TasksContext";
import { useFilter } from "@/hooks/store/context/TasksContext";
import "@testing-library/jest-dom";

describe("TaskList.tsx", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it("レンダリング時", () => {
    const { container } = render(
      <FilterProvider>
        <TaskList tasks={tasks} />
      </FilterProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
