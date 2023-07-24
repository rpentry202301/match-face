import QuestionSelectModal from "@/components/pages/admin/tasks/register/QuestionSelectModal ";
import { SelectedQuestionProvider } from "@/hooks/store/context/SelectedQuestionContext";
import { screen, render, fireEvent } from "@testing-library/react";

// Todo: 非同期関数実装後に自動テストの追加・修正の必要あり

// モーダル展開用関数
const open = () => {
  render(
    <SelectedQuestionProvider>
      <QuestionSelectModal />
    </SelectedQuestionProvider>
  );
  fireEvent.click(screen.getByRole("button"));
}

describe("QuestionSelectModal.tsx", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    open();
  })

  describe("スナップショットテスト", () => {
    it("モーダルを開いている状態", () => {
      const { baseElement } = render(
        <SelectedQuestionProvider>
          <QuestionSelectModal />
        </SelectedQuestionProvider>
      );
      expect(baseElement).toMatchSnapshot();
    });
  })

  describe("入力テスト", () => {
    it("検索ボックスの入力テスト", async () => {
      render(
        <SelectedQuestionProvider>
          <QuestionSelectModal />
        </SelectedQuestionProvider>
      );
      const input = screen.getByTestId("search-box") as HTMLInputElement;
      fireEvent.change(input, { target: { value: "案件" } });
      expect(input.value).toBe("案件");
    });
  })
})
