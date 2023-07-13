import SelectDeadline from "@/components/pages/admin/tasks/register/parts/SelectDeadline";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("SelectDeadline.tsx", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });

  describe("スナップショットテスト", () => {
    it("レンダリング時", () => {
      const { container } = render(<SelectDeadline />);
      expect(container).toMatchSnapshot();
    });
  });
  
  describe("入力テスト", () => {
    const user = userEvent.setup();
    beforeEach(() => {
      render(<SelectDeadline />);
    });
    it("「年」セレクトボックス選択", async () => {
      // 現在選択されている値をテスト
      const thisYear = new Date().getFullYear();
      const beforeSelect = screen.getByRole("option", {
        name: `${thisYear}`,
      }) as HTMLOptionElement;
      expect(beforeSelect.selected).toBe(true);
      // 異なる年を選択してテスト
      await user.selectOptions(screen.getByTestId("year"), `${thisYear + 1}`);
      const afterSelect = screen.getByRole("option", {
        name: `${thisYear + 1}`,
      }) as HTMLOptionElement;
      expect(afterSelect.selected).toBe(true);
      // 最初に選択されていた値との差分をテスト
      expect(beforeSelect.selected).toBe(false);
    });
    it("「月」セレクトボックス選択", async () => {
      // デフォルトは今月
      const thisMonth = new Date().getMonth() + 1;
      const beforeSelect = screen.getByTestId(`month:${thisMonth}`) as HTMLOptionElement;
      expect(beforeSelect.selected).toBe(true);
      // 翌月を選択
      const otherMonth = thisMonth + 1 >= 13 ? 1 : thisMonth + 1;
      await user.selectOptions(screen.getByTestId("month"), `${otherMonth}`);
      const afterSelect = screen.getByTestId(`month:${otherMonth}`) as HTMLOptionElement;
      expect(afterSelect.selected).toBe(true);
      expect(beforeSelect.selected).toBe(false);
    });
    it("「日」セレクトボックス選択", async () => {
      // デフォルトは1日
      const beforeSelect = screen.getByTestId("day:1") as HTMLOptionElement;
      expect(beforeSelect.selected).toBe(true);
      // 11日を選択
      await user.selectOptions(screen.getByTestId("day"), "11");
      const afterSelect = screen.getByTestId("day:11") as HTMLOptionElement;
      expect(afterSelect.selected).toBe(true);
      expect(beforeSelect.selected).toBe(false);
    });
    it("「時間」セレクトボックス選択", async () => {
      // デフォルトは18時
      const beforeSelect = screen.getByTestId("time:18") as HTMLOptionElement;
      expect(beforeSelect.selected).toBe(true);
      // 15時を選択
      await user.selectOptions(screen.getByTestId("time"), "15");
      const afterSelect = screen.getByTestId("time:15") as HTMLOptionElement;
      expect(afterSelect.selected).toBe(true);
      expect(beforeSelect.selected).toBe(false);
    });
  });
});
