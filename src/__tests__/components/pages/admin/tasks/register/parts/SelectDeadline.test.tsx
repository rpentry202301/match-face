import SelectDeadline from "@/components/pages/admin/tasks/register/parts/SelectDeadline";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChangeEvent, useState } from "react";

// SelectDeadlineテスト用ドライバ
const SelectDeadlineDriver = () => {
  const [deadline, setDeadline] = useState({
    year: "2023",
    month: "1",
    day: "1",
    hour: "18",
  });
  const handleChangeDeadline = (e: ChangeEvent<HTMLSelectElement>) => {
    setDeadline({
      ...deadline,
      [`${e.target.name}`]: e.target.value,
    });
  };
  return <SelectDeadline state={deadline} handleChange={handleChangeDeadline}/>
};

describe("SelectDeadline.tsx", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });

  describe("スナップショットテスト", () => {
    it("レンダリング時", () => {
      const { container } = render(
        <SelectDeadlineDriver />
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe("入力テスト", () => {
    const user = userEvent.setup();
    beforeEach(() => {
      cleanup();
      render(<SelectDeadlineDriver />);
    });
    it("「年」セレクトボックス選択", async () => {
      // 現在選択されている値をテスト
      const beforeSelect = screen.getByRole("option", {
        name: "2023",
      }) as HTMLOptionElement;
      expect(beforeSelect.selected).toBe(true);
      // 異なる年を選択してテスト
      await user.selectOptions(screen.getByTestId("year"), "2024");
      const afterSelect = screen.getByRole("option", {
        name: "2024",
      }) as HTMLOptionElement;
      expect(afterSelect.selected).toBe(true);
      // 最初に選択されていた値との差分をテスト
      expect(beforeSelect.selected).toBe(false);
    });
    it("「月」セレクトボックス選択", async () => {
      // デフォルトは今月
      const beforeSelect = screen.getByTestId("month:1") as HTMLOptionElement;
      expect(beforeSelect.selected).toBe(true);
      // 翌月を選択
      await user.selectOptions(screen.getByTestId("month"), "11");
      const afterSelect = screen.getByTestId("month:11") as HTMLOptionElement;
      expect(afterSelect.selected).toBe(true);
      expect(beforeSelect.selected).toBe(false);
    });
    it("「日」セレクトボックス選択", async () => {
      // 1日を選択
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
      const beforeSelect = screen.getByTestId("hour:18") as HTMLOptionElement;
      expect(beforeSelect.selected).toBe(true);
      // 15時を選択
      await user.selectOptions(screen.getByTestId("hour"), "15");
      const afterSelect = screen.getByTestId("hour:15") as HTMLOptionElement;
      expect(afterSelect.selected).toBe(true);
      expect(beforeSelect.selected).toBe(false);
    });
  });
});
