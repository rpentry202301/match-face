import { render, screen, cleanup, act, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { mockHistoriesData, skillData } from "./mock";
import HistoriesPage from "@/app/(pages)/(general)/(other)/histories/page";
import HistoryList from "@/components/pages/general/histories/HistoryList";
import userEvent from "@testing-library/user-event";
import OrangeButton from "@/components/ui/button/OrangeButton";

// スナップショットテスト
describe("スナップショットテスト", () => {
  global.fetch = jest.fn().mockImplementation((url, config) => {
    if (url === "http://localhost:3000/api/histories/skills") {
      return {
        ok: true,
        json: async () => skillData,
      };
    }
    if (url === "http://localhost:3000/api/histories") {
      return {
        ok: true,
        json: async () => mockHistoriesData,
      };
    }
  });
  it("スナップショット", async () => {
    const { container } = render(<HistoryList />);
    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });
});

// 機能・インタラクションテスト
describe("一般ユーザー質問一覧画面", () => {
  global.fetch = jest.fn().mockImplementation((url, config) => {
    if (url === "http://localhost:3000/api/histories/skills") {
      return {
        ok: true,
        json: async () => skillData,
      };
    }
    if (url === "http://localhost:3000/api/histories") {
      return {
        ok: true,
        json: async () => mockHistoriesData,
      };
    }
  });
  describe("HistoryListコンポーネント", () => {
    it("取得データの要素数の<button>が存在する", async () => {
      await waitFor(() => {
        render(<HistoryList />);
      });
      await waitFor(() => {
        const element = screen.getAllByRole("button");
        screen.debug();
        expect(element).toHaveLength(2);
      });
    });
  });

  // describe("HistoryListに引数を与える", () => {
  //   it("取得データの要素数は０である", async () => {
  //     await render(<HistoryList month={"2023-10-01"} />);
  //     await waitFor(() => {
  //       const element = screen.getAllByRole("button");
  //       screen.debug();
  //       expect(element).toHaveLength(0);
  //     });
  //   });
  // });
  //   describe("ボタン", () => {
  //     it("回答済みであれば、ボタンの色が緑である&&「確認する」", async () => {
  //       let element;
  //       await waitFor(() => {
  //         element = screen.getByTestId(
  //           `confirmButton${mockData.answerRequestList[0].id}`
  //         );
  //       });
  //       console.log(element);
  //       expect(element).toHaveClass("bg-green");
  //       expect(element).toHaveTextContent("確認する");
  //     });
  //     it("確認するボタンにresult/[id]へのLinkがある", async () => {
  //       let element;
  //       await waitFor(() => {
  //         element = screen.getByTestId(
  //           `linkButton${mockData.answerRequestList[0].id}`
  //         );
  //       });
  //       screen.debug();
  //       expect(element).toHaveAttribute(
  //         "href",
  //         `result/${mockData.answerRequestList[0].id}`
  //       );
  //     });
  //   });
});
