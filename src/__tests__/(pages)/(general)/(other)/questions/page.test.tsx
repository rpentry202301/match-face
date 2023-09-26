import { QuestionsContent } from "@/app/(pages)/(general)/(other)/questions/questionsContent";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { mockData } from "./mock";

// スナップショットテスト
describe("スナップショットテスト", () => {
  global.fetch = jest.fn().mockImplementation((url, config) => {
    if (url === "/api/questions") {
      return {
        ok: true,
        json: async () => mockData,
      };
      // }
    }
  });
  beforeEach(async () => {
    await waitFor(() => {
      render(<QuestionsContent userId={1} />);
    });
  });

  it("スナップショット", async () => {
    const { container } = render(<QuestionsContent userId={1} />);

    // fetchの非同期応答を待つ
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    expect(container).toMatchSnapshot();
  });
});

// 機能・インタラクションテスト
describe("一般ユーザー質問一覧画面", () => {
  global.fetch = jest.fn().mockImplementation((url, config) => {
    if (url === "/api/questions") {
      return {
        ok: true,
        json: async () => mockData,
      };
      // }
    }
  });
  beforeEach(async () => {
    await waitFor(() => {
      render(<QuestionsContent userId={1} />);
    });
  });
  describe("テーブル", () => {
    it("取得データが３つの時、３つの<button>が存在する", async () => {
      // const dataNumbers = mockData.answerRequestList.length;
      let element: HTMLElement[];
      await waitFor(() => {
        element = screen.getAllByRole("button");
      });
      screen.debug();
      await waitFor(() => expect(element).toHaveLength(3));
    });
  });
  describe("ボタン", () => {
    it("回答済みであれば、ボタンの色が緑である&&「確認する」", async () => {
      let element;
      await waitFor(() => {
        element = screen.getByTestId(
          `confirmButton${mockData.answerRequestList[0].id}`
        );
      });
      expect(element).toHaveClass("bg-green");
      expect(element).toHaveTextContent("確認する");
    });
    it("未回答であれば、ボタンの色が赤である&&「回答する」", async () => {
      let element;
      await waitFor(() => {
        element = screen.getByTestId(
          `confirmButton${mockData.answerRequestList[2].id}`
        );
      });
      screen.debug();
      expect(element).toHaveClass("bg-red");
      expect(element).toHaveTextContent("回答する");
    });
    it("確認するボタンにresult/[id]へのLinkがある", async () => {
      let element;
      await waitFor(() => {
        element = screen.getByTestId(
          `linkButton${mockData.answerRequestList[0].id}`
        );
      });
      screen.debug();
      expect(element).toHaveAttribute(
        "href",
        `result/${mockData.answerRequestList[0].id}`
      );
    });
  });
});
