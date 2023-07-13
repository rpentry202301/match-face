import QuestionsPage from "@/app/(pages)/(general)/(other)/questions/page";
import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import { data } from "@/const/questions";

describe("一般ユーザー質問一覧画面", () => {
  // const user = userEvent.setup();
  // beforeEach(() => {
  //   render(<QuestionsPage />);
  // });
  describe("テーブル", () => {
    it("取得データの要素数+1個(見出しのtr)の<tr>が存在する", () => {
      render(<QuestionsPage />);
      const dataNumbers = data.length;
      const element = screen.getAllByRole("row");
      screen.debug(element);
      expect(element).toHaveLength(dataNumbers + 1);
    });
    it("回答期日が表示される", () => {
      render(<QuestionsPage />);
      const element = screen.getByText(data[0].answer_deadline);
      screen.debug(element);
      expect(element).toBeInTheDocument();
    });
  });
  describe("ボタン", () => {
    it("true時のボタンの色が緑である&&「確認する」", () => {
      render(<QuestionsPage />);
      const element = document.getElementById(`button-true-${data[0].id}`);
      console.log(element);
      expect(element).toHaveClass("bg-green");
      expect(element).toHaveTextContent("確認する");
    });
    it("確認するボタンにresult/[id]へのLinkがある", () => {
      render(<QuestionsPage />);
      const element = screen.getByTestId(`confirmButton${data[0].id}`);
      console.log(element);
      expect(element).toHaveAttribute("href", `result/${data[0].id}`);
    });
  });
});
