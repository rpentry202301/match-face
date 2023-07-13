// Todo: UserIcon非同期通信のモック

import HamburgerBtn from "@/components/elements/header/button/HamburgerBtn";
import UserIcon from "@/components/elements/header/nav/UserIcon";
import { fireEvent, render, screen } from "@testing-library/react";

describe("HamburgerBtn.tsx", () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });

  describe("スナップショットテスト", () => {
    it("デフォルト(ナビゲーションウィンドウ閉)", async () => {
      // UserIcon.tsxのモック
      const MockUserIcon = await UserIcon();
      const { container } = render(<HamburgerBtn>{MockUserIcon}</HamburgerBtn>);
      expect(container).toMatchSnapshot();
    });
  });
  describe("ナビゲーションウィンドウ展開テスト", () => {
    beforeEach(async () => {
      const MockUserIcon = await UserIcon();
      render(<HamburgerBtn>{MockUserIcon}</HamburgerBtn>);
    });
    it("ナビゲーションウィンドウ開く→閉じる", async () => {
      // デフォルト状態との差分でテストする
      const MockUserIcon = await UserIcon();
      const DefaultRender = render(
        <HamburgerBtn>{MockUserIcon}</HamburgerBtn>
      ).container;
      // ナビゲーションウィンドウを開く
      fireEvent.click(screen.getByRole("button"));
    });
  });
});
