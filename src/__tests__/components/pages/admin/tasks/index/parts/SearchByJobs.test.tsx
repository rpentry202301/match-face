import SearchByJobs from "@/components/pages/admin/tasks/index/parts/SearchByJobs";
import { departments } from "@/const/tasks";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
import "@testing-library/jest-dom";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("TaskList.tsx", () => {
  afterAll(() => {
    jest.clearAllMocks();
    cleanup();
  });

  describe("入力テスト", () => {
    beforeEach(() => {
      cleanup();
      render(<SearchByJobs departments={departments} />);
    });
    it("検索ボックス入力テスト", () => {
      const input = screen.getByTestId("search-box") as HTMLInputElement;
      fireEvent.change(input, { target: { value: "hoge foo" } });
      // 正常に入力されているかテスト
      expect(input.value).toBe("hoge foo");
    });
    it("職種フィルターボタンテスト", () => {
      const phpBtn = screen.getByTestId("btn_PHP");
      fireEvent.click(phpBtn); // "PHP"ボタン押下
      const frBtn = screen.getByTestId("btn_FR");
      fireEvent.click(frBtn); // "FR"ボタン押下

      // ボタン押下時のクラス
      const clickedClass =
        "bg-gray-200 translate-y-0.5 shadow-sm py-2 px-4 rounded-full border";

      expect(phpBtn).toHaveClass(clickedClass);
      expect(frBtn).toHaveClass(clickedClass);

      const javaBtn = screen.getByTestId("btn_Java");
      const clBtn = screen.getByTestId("btn_CL");
      const qaBtn = screen.getByTestId("btn_QA");
      const mlBtn = screen.getByTestId("btn_ML");
      expect(javaBtn).not.toHaveClass(clickedClass);
      expect(clBtn).not.toHaveClass(clickedClass);
      expect(qaBtn).not.toHaveClass(clickedClass);
      expect(mlBtn).not.toHaveClass(clickedClass);
    });
    it("検索条件送信テスト", () => {
      const input = screen.getByTestId("search-box") as HTMLInputElement;
      fireEvent.change(input, { target: { value: "hoge foo" } }); // ワード検索入力
      const phpBtn = screen.getByTestId("btn_PHP");
      fireEvent.click(phpBtn); // "PHP"ボタン押下
      const frBtn = screen.getByTestId("btn_FR");
      fireEvent.click(frBtn); // "FR"ボタン押下

      const mockRouter = useRouter()
      fireEvent.click(screen.getByText("検索"));
      expect(mockRouter.push).toBeCalledTimes(1);
    });
  });
});
