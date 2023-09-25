import { project } from "./mock";
import { render } from "@testing-library/react";
import ResultPage from "@/app/(pages)/(general)/(other)/result/[id]/page";
import "@testing-library/jest-dom";
import { AppRouterContextProviderMock } from "@/__tests__/test_utils/app-router-context-provider-mock";

describe("ResultPage", () => {
  // 元のfetchの実装を保存
  const originalFetch = global.fetch;
  const push = jest.fn();

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

  it("matches the snapshot", () => {
    const { asFragment } = render(
      <AppRouterContextProviderMock router={{ push }}>
        <ResultPage params={{ id: "1" }} />
      </AppRouterContextProviderMock>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
