import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import { data } from "@/const/questions";
import HistoriesPage from "@/app/(pages)/(general)/(other)/histories/page";
import userEvent from "@testing-library/user-event";

describe("一般ユーザー質問一覧画面", () => {
  const user = userEvent.setup();
  beforeEach(() => {
    render(<HistoriesPage />);
  });
  describe("テーブル", () => {
    it("取得データの要素数+1個(見出しのtr)の<tr>が存在する", () => {
      const dataNumbers = data.length;
      const element = screen.getAllByRole("row");
      screen.debug(element);
      expect(element).toHaveLength(dataNumbers + 1);
    });
    it("文字数制限", () => {
      const truncateString = jest.fn();
      //   const element = screen.getByTestId(`projectDetail${data[0].id}`);
      //   screen.debug(element);
      expect(truncateString).toHaveBeenCalled();
    });
  });
});
