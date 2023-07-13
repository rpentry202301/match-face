import HamburgerBtn from "@/components/elements/header/button/HamburgerBtn";
import UserIcon from "@/components/elements/header/nav/UserIcon";
import { fireEvent, render, screen } from "@testing-library/react";

// Todo: UserIcon.tsxの非同期通信のmock

describe("HamburgerBtn.tsx", () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });

  // デフォルト時のスナップショットは関連テストで行うため、
  //　ナビゲーションウィンドウが開いた際のテストのみ実行
  describe("スナップショットテスト", () => {
    beforeAll(async () => {
      render(<HamburgerBtn>{await UserIcon()}</HamburgerBtn>);
      fireEvent.click(screen.getByRole("button"));
    });
    it("ナビゲーションウィンドウ展開時", async () => {
      // UserIcon.tsxのモック
      const { baseElement } = render(
        <HamburgerBtn>{await UserIcon()}</HamburgerBtn>
      );
      expect(baseElement).toMatchSnapshot();
    });
  });
});
