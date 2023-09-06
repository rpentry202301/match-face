import QuestionsPage from "@/app/(pages)/(general)/(other)/questions/page";
import { render, screen, cleanup, act, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { data } from "@/const/questions";
import { mockGetData } from "./mock";

// //ユーザのイベントをテストするため
// import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
// // ダミーAPI作成用
// import { rest, RequestHandler, setupWorker } from "msw";
// import { setupServer } from "msw/node";
// import "cross-fetch/polyfill";

// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => {
//   server.close();
// });
// const server = setupServer(
//   rest.post("/api/questions", async (req, res, ctx) => {
//     const { user_id } = await req.json();
//     //ステータスと返すデータの指定
//     return res(
//       ctx.status(200),
//       ctx.json({
//         id: 1,
//         deadline: "2023-12-01 18:00",
//         project: {
//           name: "バックエンド案件",
//           detail: "販促アプリの新規開発、既存システムの保守・運用。",
//         },
//         answered: false,
//       })
//     );
//   })
// );

jest.mock("../../../../../app/api/(general)/questions/route");

describe("スナップショットテスト", () => {
  it("データ取得後の質問一覧画面が表示される", async () => {
    const mockFn = mockGetData();
    const { container } = render(<QuestionsPage />);
    expect(mockFn).toBeCalled();
    expect(container).toMatchSnapshot();
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
