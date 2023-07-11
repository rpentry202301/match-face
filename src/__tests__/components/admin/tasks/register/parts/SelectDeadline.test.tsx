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
      const beforeSelectYear = screen.getByRole("option", {
        name: "2023",
      }) as HTMLOptionElement;
      expect(beforeSelectYear.selected).toBe(true);
      await user.selectOptions(screen.getByTestId("year"), "2024");
      const selectYear = screen.getByRole("option", {name: "2024"}) as HTMLOptionElement;
      expect(selectYear.selected).toBe(true);
      expect(beforeSelectYear.selected).toBe(false)
    });
  });
});
