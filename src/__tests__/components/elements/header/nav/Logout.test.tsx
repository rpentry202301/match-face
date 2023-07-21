import { cleanup, render } from "@testing-library/react";
import Logout from "../../../../../components/elements/header/nav/Logout";

describe("Logout.tsx", () => {
  beforeAll(() => {
    jest.clearAllMocks();
    cleanup();
  });
  afterAll(() => {
    jest.clearAllMocks();
    cleanup();
  });
  it("スナップショットテスト", () => {
    const { container } = render(<Logout />);
    expect(container).toMatchSnapshot();
  });
  describe("ログアウトテスト", () => {
    // Todo: ログアウト機能(cookieの削除など)テスト
    // Todo: 画面遷移のテスト
  });
});
