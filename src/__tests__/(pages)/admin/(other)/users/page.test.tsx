import { render, screen, fireEvent } from "@testing-library/react";
import UsersPage from "@/app/(pages)/admin/(other)/users/page";
import React from "react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import UserList from "@/components/pages/admin/tasks/register/UserList";

describe("ユーザー管理画面のテスト", () => {
  beforeEach(() => {
    render(<UsersPage />);
  });
  it("スナップショット", async () => {
    const { container } = render(<UsersPage />);
    expect(container).toMatchSnapshot();
  });

  describe("UserListのテスト", () => {
    it("初期値に入社日昇順が設定されていることを確認", async () => {
      expect(screen.getByRole("option", { name: "入社日昇順" }).selected).toBe(
        true
      );
    });
    it("optionを入社日降順に変更する", () => {
      userEvent.click(screen.getByRole("option", { name: "入社日降順" }));
      expect(screen.getByRole("option", { name: "入社日降順" })).toBeInTheDocument()
    });
  });
});
