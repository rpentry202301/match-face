import userEvent from "@testing-library/user-event";
import { render, screen, fireEvent } from "@testing-library/react";
import AdminHome from "@/app/(pages)/admin/(other)/(top)/page";
import React from "react";
import "@testing-library/jest-dom";

describe("adminトップページのテスト", () => {
  beforeEach(() => {
    render(<AdminHome />);
  });
  it("スナップショット", async () => {
    const { container } = render(<AdminHome />);
    expect(container).toMatchSnapshot();
  });

  // PASSしないので一旦保留
  describe("メニューテスト", () => {
    it("メニューをクリックすると、対象のページへ遷移する", async () => {
      const menuButton = screen.getByTestId("menu_1");
      await userEvent.click(menuButton);
      const currentUrl = window.location.pathname;
      expect(currentUrl).toContain("/admin/handle-question");
    });
  });
});
