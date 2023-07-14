import HamburgerBtn from "@/components/elements/header/button/HamburgerBtn";
import UserIcon from "@/components/elements/header/nav/UserIcon";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { afterEach } from "node:test";

// Todo: UserIcon.tsxの非同期通信のmock

describe("HamburgerBtn.tsx", () => {
  beforeAll(() => {
    jest.clearAllMocks();
    cleanup();
  });
  afterAll(() => {
    jest.clearAllMocks();
    cleanup();
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
  describe("ナビゲーションウィンドウ表示テスト", () => {
    beforeEach(async () => {
      render(<HamburgerBtn>{await UserIcon()}</HamburgerBtn>);
    });
    afterEach(() => {
      cleanup();
    });
    it("ナビゲーション展開(<nav>のクラスに'right-[-100%]'がない)", () => {
      const nav = screen.getByTestId("header_nav");
      // 1回だけボタンを押す
      fireEvent.click(screen.getByRole("button"));
      expect(nav).not.toHaveClass("right-[-100%]");
    });
    it("ナビゲーション展開→折り畳む(<nav>のクラスに'right-[-100%]'がある)", () => {
      const nav = screen.getByTestId("header_nav");
      // 2回ボタンを押す
      fireEvent.click(screen.getByRole("button"));
      fireEvent.click(screen.getByRole("button"));
      expect(nav).toHaveClass("right-[-100%]");
    });
  });
});
