import { render } from "@testing-library/react";
import Logout from "../../../../../components/elements/header/nav/Logout";

describe("Logout.tsx", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.clearAllMocks();
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
