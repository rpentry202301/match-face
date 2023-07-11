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
      const beforeSelect = screen.getByRole("option", {
        name: "2023",
      }) as HTMLOptionElement;
      expect(beforeSelect.selected).toBe(true);
      await user.selectOptions(screen.getByTestId("year"), "2024");
      const afterSelect = screen.getByRole("option", {
        name: "2024",
      }) as HTMLOptionElement;
      expect(afterSelect.selected).toBe(true);
      expect(beforeSelect.selected).toBe(false);
    });
    it("「月」セレクトボックス選択", async () => {
      const beforeSelect = screen.getByRole("option", {
        name: "1",
      }) as HTMLOptionElement;
      expect(beforeSelect.selected).toBe(true);
      await user.selectOptions(screen.getByTestId("month"), "12");
      const afterSelect = screen.getByRole("option", {
        name: "12",
      }) as HTMLOptionElement;
      expect(afterSelect.selected).toBe(true);
      expect(beforeSelect.selected).toBe(false);
    });
    it("「日」セレクトボックス選択", async () => {
      const beforeSelect = screen.getByRole("option", {
        name: "1",
      }) as HTMLOptionElement;
      expect(beforeSelect.selected).toBe(true);
      await user.selectOptions(screen.getByTestId("day"), "25");
      const afterSelect = screen.getByRole("option", {
        name: "25",
      }) as HTMLOptionElement;
      expect(afterSelect.selected).toBe(true);
      expect(beforeSelect.selected).toBe(false);
    });
    it("「時間」セレクトボックス選択", async () => {
      const beforeSelect = screen.getByRole("option", {
        name: "0",
      }) as HTMLOptionElement;
      expect(beforeSelect.selected).toBe(true);
      await user.selectOptions(screen.getByTestId("time"), "23");
      const afterSelect = screen.getByRole("option", {
        name: "23",
      }) as HTMLOptionElement;
      expect(afterSelect.selected).toBe(true);
      expect(beforeSelect.selected).toBe(false);
    });
  });
});
