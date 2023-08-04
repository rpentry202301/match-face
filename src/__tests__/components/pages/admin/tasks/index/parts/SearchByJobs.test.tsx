import SearchByJobs from "@/components/pages/admin/tasks/index/parts/SearchByJobs";
import { FilterProvider } from "@/hooks/store/context/TasksContext";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

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
        <SearchByJobs />
      </FilterProvider>
    );
    expect(container).toMatchSnapshot();
  });
  describe("入力テスト", () => {
    beforeAll(() => {
      cleanup();
      render(
        <FilterProvider>
          <SearchByJobs />
        </FilterProvider>
      );
    });
    it("検索ボックス入力テスト", () => {
      const input = screen.getByTestId("search-box") as HTMLInputElement;
      fireEvent.change(input, { target: { value: "hoge" } });
      // 正常に入力されているかテスト
      expect(input.value).toBe("hoge");
    });
  });
});
