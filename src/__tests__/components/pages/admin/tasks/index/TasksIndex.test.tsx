import TasksIndex from "@/components/pages/admin/tasks/index/TasksIndex";
import {
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { FilterProvider } from "@/hooks/store/context/TasksContext";

describe("TaskIndex.tsx", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    cleanup();
  });
  afterAll(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it("レンダリング時", () => {
    const { container } = render(
      <FilterProvider>
        <TasksIndex />
      </FilterProvider>
    );
    expect(container).toMatchSnapshot();
  });
  it("新規タスク作成ボタンリンク", () => {
    render(
      <FilterProvider>
        <TasksIndex />
      </FilterProvider>
    );
    const LinkButton = screen.getByTestId("link_task_register");
    // console.log("LinkButton", LinkButton);
    expect(LinkButton).toHaveAttribute("href", "/admin/tasks/register");
  });
  describe("useFilter(context hook)のテスト", () => {
    beforeEach(() => {
      cleanup();
      render(
        <FilterProvider>
          <TasksIndex />
        </FilterProvider>
      );
    });
    it("フリーワード検索テスト", () => {
      // 案件名が"hoge", 職種が"Java"のデータを検索(tasks.id = 1)
      const input = screen.getByTestId("search-box") as HTMLInputElement;
      fireEvent.change(input, { target: { value: "hoge Java" } });
      fireEvent.click(screen.getByText("検索"));
      // id = 1 のtasksデータが検索結果に存在する
      expect(screen.queryByTestId("task-data-1")).toBeInTheDocument();
      // その他のデータが検索結果に存在しないかテスト
      expect(screen.queryByTestId("task-data-2")).toBeNull();
      expect(screen.queryByTestId("task-data-3")).toBeNull();
      expect(screen.queryByTestId("task-data-4")).toBeNull();
      expect(screen.queryByTestId("task-data-5")).toBeNull();
      expect(screen.queryByTestId("task-data-6")).toBeNull();
    });
    it("職種フィルターテスト", () => {
      // "Java", "FR"ボタンを押下→絞り込みボタン押下(tasks.id = 1, 3)
      fireEvent.click(screen.getByTestId("Java-btn"));
      fireEvent.click(screen.getByTestId("FR-btn"));
      fireEvent.click(screen.getByText("絞り込み"));
      // 職種が"Java", "FR"のデータが検索結果に存在する
      expect(screen.queryByTestId("task-data-1")).toBeInTheDocument();
      expect(screen.queryByTestId("task-data-3")).toBeInTheDocument();
      // その他の職種のデータが検索結果に存在しない
      expect(screen.queryByTestId("task-data-2")).toBeNull();
      expect(screen.queryByTestId("task-data-4")).toBeNull();
      expect(screen.queryByTestId("task-data-5")).toBeNull();
      expect(screen.queryByTestId("task-data-6")).toBeNull();
    });
    it("フリーワード検索&職種フィルターテスト", () => {
      // 検索ボックスに案件名"hoge"を入力, 職種フィルターボタン"Java"押下(tasks.id = 1)
      // 検索
      const input = screen.getByTestId("search-box") as HTMLInputElement;
      fireEvent.change(input, { target: { value: "hoge Java" } });
      fireEvent.click(screen.getByText("検索"));
      // 職種フィルターボタン
      expect(screen.queryByTestId("task-data-1")).toBeInTheDocument();
      // id = 1 のtasksデータが検索結果に存在する
      expect(screen.queryByTestId("task-data-1")).toBeInTheDocument();
      // その他のデータが検索結果に存在しないかテスト
      expect(screen.queryByTestId("task-data-2")).toBeNull();
      expect(screen.queryByTestId("task-data-3")).toBeNull();
      expect(screen.queryByTestId("task-data-4")).toBeNull();
      expect(screen.queryByTestId("task-data-5")).toBeNull();
      expect(screen.queryByTestId("task-data-6")).toBeNull();
    });
  });
});
