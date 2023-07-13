import HamburgerBtn from "@/components/elements/header/button/HamburgerBtn";
import UserIcon from "@/components/elements/header/nav/UserIcon";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Todo: UserIcon.tsxの非同期通信のmock

describe("HamburgerBtn.tsx", () => {
  const user = userEvent.setup();
  beforeAll(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });

  // デフォルト時のスナップショットは関連テストで行うため、
  // ナビゲーションウィンドウ展開時のテストのみ実行
  describe("スナップショットテスト", () => {
    it("デフォルト(ナビゲーションウィンドウ非展開時)", async () => {
      const { container } = render(
        <HamburgerBtn>{await UserIcon()}</HamburgerBtn>
      );
      expect(container).toMatchSnapshot();
    });
  });
});
