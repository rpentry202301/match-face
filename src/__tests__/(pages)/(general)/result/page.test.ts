import { project } from "./mock";
import { render, waitFor } from "@testing-library/react";
import ResultPage from "@/app/(pages)/(general)/(other)/result/[id]/page";
import "@testing-library/jest-dom";

describe("ResultPage", () => {
  // 元のfetchの実装を保存
  const originalFetch = global.fetch;

  // 各テストの前にモックの設定を行う
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation((url, config) => {
      if (url === "api/result") {
        return Promise.resolve({
          ok: true,
          json: async () => project,
        });
      }
      return originalFetch(url, config);
    });
  });

  // 各テストの後にモックをクリア
  afterEach(() => {
    jest.clearAllMocks();
    global.fetch = originalFetch;
  });

  it("スナップショットテスト", async () => {
    const { container } = render(<ResultPage params={{ id: "1" }} />);

    // fetchの非同期応答を待つ
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    expect(container).toMatchSnapshot();
  });
});
