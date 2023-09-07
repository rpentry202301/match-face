import QuestionsPage from "@/app/(pages)/(general)/(other)/questions/page";
import { render, screen, cleanup, act, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
// import { data } from "@/const/questions";
import { mockGetData } from "./mock";

const data = {
  id: 1,
  deadline: "2023-12-01 18:00",
  project: {
    name: "バックエンド案件",
    detail: "販促アプリの新規開発、既存システムの保守・運用。",
  },
  answered: false,
};

describe("スナップショットテスト", () => {
  global.fetch = jest.fn().mockImplementation((url, config) => {
    if (url === "http://localhost:3000/api/questions") {
      return {
        ok: true,
        json: async () => data,
      };
    }
  });
  it("データ取得後");
  it("データ取得前の質問一覧画面が表示される", async () => {
    const { container } = render(<QuestionsPage />);
    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });
});

describe("一般ユーザー質問一覧画面", () => {
  describe("テーブル", () => {
    it("取得データの要素数+1個(見出しのtr)の<tr>が存在する", async () => {
      render(<QuestionsPage />);
      const dataNumbers = data.length;
      const element = await screen.getAllByRole("row");
      screen.debug(element);
      await waitFor(() => expect(element).toHaveLength(dataNumbers + 1));
    });
    it("回答期日が表示される", () => {
      render(<QuestionsPage />);
      const element = screen.getByText(data[0].deadline);
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
