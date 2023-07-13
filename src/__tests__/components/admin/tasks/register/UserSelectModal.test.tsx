import UserSelectModal from "@/components/pages/admin/tasks/register/UserSelectModal";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Todo: 非同期関数実装後に自動テストの追加・修正の必要あり

// モーダル展開用関数
const open = () => {
  render(<UserSelectModal />);
  fireEvent.click(screen.getByRole("button"));
}

describe("UserSelectModal.tsx", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    open();
  })

  describe("スナップショットテスト", () => {
    it("モーダルを開いている状態", () => {
      const { container } = render(<UserSelectModal />);
      expect(container).toMatchSnapshot();
    });
  })

  describe("入力テスト", () => {
    const user = userEvent.setup()
    it("検索ボックスの入力テスト", async () => {
      render(<UserSelectModal />);
      const input = screen.getByTestId("search-box") as HTMLInputElement;
      fireEvent.change(input, { target: { value: "田中太郎" } });
      expect(input.value).toBe("田中太郎");
    });
  
    it("入社年の選択テスト", async () => {
      render(<UserSelectModal />);
      // デフォルト選択が空文字かどうか
      const beforeSelect = screen.getByTestId("year:") as HTMLOptionElement;
      expect(beforeSelect.selected).toBe(true);
      // 今年の入社年を選択してテスト
      const thisYear = new Date().getFullYear();
      await user.selectOptions(screen.getByTestId("select-year"), `${thisYear}`);
      const afterSelect = screen.getByTestId(`year:${thisYear}`) as HTMLOptionElement;
      expect(afterSelect.selected).toBe(true);
    });

    it("入社月の選択テスト", async () => {
      render(<UserSelectModal />);
      const beforeSelect = screen.getByTestId("month:") as HTMLOptionElement;
      expect(beforeSelect.selected).toBe(true);
      // 1月を選択してテスト
      await user.selectOptions(screen.getByTestId("select-month"), "1")
      const afterSelect = screen.getByTestId("month:1") as HTMLOptionElement;
      expect(afterSelect.selected).toBe(true);
    })

    // Todo: ユーザーグループは本来fetchで持ってくる情報のため、mock作成の必要あり
    // 今回は仮作成
    it("ユーザーグループの選択テスト", async () => {
      render(<UserSelectModal />);
      const nowGroup = "2023年7月入社";
      const beforeSelect = screen.getByTestId(`group:${nowGroup}`) as HTMLOptionElement;
      expect(beforeSelect.selected).toBe(true);
      // 別のグループを選択
      const newGroup = "2023年7月入社フロント";
      await user.selectOptions(screen.getByTestId("select-group"), newGroup);
      const afterSelect = screen.getByTestId(`group:${newGroup}`) as HTMLOptionElement;
      expect(afterSelect.selected).toBe(true);
    })
  });
  
});
