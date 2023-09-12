import { render, screen, cleanup, act, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { mockHistoriesData } from "./mock";
import HistoryList from "@/components/pages/general/histories/HistoryList";

// スナップショットテスト
describe("スナップショットテスト", () => {
  // global.fetch = jest.fn().mockImplementation((url, config) => {
  //   if (url === "http://localhost:3000/api/histories/skills") {
  //     return {
  //       ok: true,
  //       json: async () => skillData,
  //     };
  //   }
  //   if (url === "http://localhost:3000/api/histories") {
  //     return {
  //       ok: true,
  //       json: async () => mockHistoriesData,
  //     };
  //   }
  // });
  it("スナップショット", async () => {
    const { container } = render(<HistoryList />);
    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });
});

// 機能・インタラクションテスト
describe("一般ユーザー質問一覧画面", () => {
  describe("Fetch前のHistoryList", () => {
    it("非同期通信前はリストに何も表示されない", async () => {
      await waitFor(() => {
        render(<HistoryList />);
      });
      screen.debug();
      expect(screen.queryByAltText("バックエンド案件")).not.toBeInTheDocument();
    });
  });

  describe("Fetch後のHistoryList", () => {
    it("絞り込み後、mock.tsで定義済みのデータが表示されている", async () => {
      await waitFor(() => {
        render(<HistoryList />);
      });
      await waitFor(() => {
        global.fetch = jest.fn().mockImplementation((url, config) => {
          if (url === "http://localhost:3000/api/histories") {
            return {
              ok: true,
              json: async () => mockHistoriesData,
            };
          }
        });
      });
      await waitFor(() => screen.debug());
      await waitFor(() =>
        expect(screen.getAllByText("バックエンド案件")).toHaveLength(2)
      );
    });
  });
});

// describe("POSTが正しい内容で呼び出されたか検証<成功していない>", () => {
//   it("handles form submission and fetches data", async () => {
//     // Mock fetch メソッド
//     const fetchMock = jest.fn();

//     // Mock JSON メソッド
//     const jsonMock = jest.fn().mockResolvedValue(mockHistoriesData);

//     // モックを設定
//     global.fetch = fetchMock;
//     fetchMock.mockResolvedValue({
//       json: jsonMock,
//     });

//     // コンポーネントをレンダリング
//     render(<HistoryList month="2023-09-01" skill={[8]} />);

//     // フォーム送信後の非同期操作を待つ
//     await act(async () => {
//       // fetchリクエストが正しく呼び出されたかどうかを確認
//       expect(global.fetch).toHaveBeenCalledWith(
//         "http://localhost:3000/api/histories",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             user_id: 1,
//             month: "2023-09-01",
//             skill: [8],
//           }),
//         }
//       );

// レスポンスが正しく表示されるか確認
// const responseElement = getByText("Response: success");
// expect(responseElement).toBeInTheDocument();
//     });

//     // fetch関数のモックをクリーンアップ
//     fetchMock.mockRestore();
//   });
// });
