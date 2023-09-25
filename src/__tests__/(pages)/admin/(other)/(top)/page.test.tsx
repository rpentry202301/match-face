import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import AdminHome from "@/app/(pages)/admin/(other)/(top)/page";
import AdminMenu from "@/components/pages/admin/AdminMenu";
import React from "react";
import "@testing-library/jest-dom";
import { adminMenuMock } from "./adminMenuMock";

global.fetch = jest.fn().mockImplementation(() =>
  Promise.resolve({
    json: () => Promise.resolve(adminMenuMock),
  })
);

describe("管理者トップページのテスト", () => {
  const user = userEvent.setup();

  beforeEach(async () => {
    await waitFor(() => {
      render(<AdminMenu />);
    });
  });

  it("スナップショット", async () => {
    const { container } = render(<AdminHome />);
    await waitFor(() => expect(container).toMatchSnapshot());
  });

  it("管理者メニューが表示される", async () => {
    // expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      const adminMenu = screen.getAllByRole("button");
      expect(adminMenu).toHaveLength(5);
      screen.debug();
    });

    await waitFor(() => {
      const menuButton = screen.getByTestId("menu_link_1");
      expect(menuButton).toBeInTheDocument();
      expect(menuButton).toHaveTextContent("質問・回答例の追加・編集");
    });
  });

  it("メニュークリックでページ遷移する", async () => {
    const menuButton = document.querySelector(
      "a[href='/admin/handle-question']"
    ) as HTMLElement;
    user.click(menuButton);
    expect(menuButton).toHaveAttribute("href", "/admin/handle-question");
  });
});
