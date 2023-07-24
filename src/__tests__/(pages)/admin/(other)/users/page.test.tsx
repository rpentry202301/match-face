import { render, screen, fireEvent } from "@testing-library/react";
import UsersPage from "@/app/(pages)/admin/(other)/users/page";
import userEvent from "@testing-library/user-event";
import React from "react";
import "@testing-library/jest-dom";

const user = userEvent.setup();
describe("ユーザー管理画面のテスト", () => {
  it("スナップショット", async () => {
    const { container } = render(<UsersPage />);
    expect(container).toMatchSnapshot();
  });

  // SearchUserコンポーネントのテスト
  it("input欄が表示されている", () => {
    render(<UsersPage />);
    const input = screen.getByTestId("input");
    expect(input).toBeInTheDocument();
  });
  it("検索ボタンが表示されている", () => {
    render(<UsersPage />);
    const serachButton = screen.getByTestId("searchButton");
    expect(serachButton).toBeInTheDocument();
  });

  it("年月の値を変更する", () => {
    render(<UsersPage />);
    const year = screen.getByTestId<HTMLSelectElement>("year");
    const month = screen.getByTestId<HTMLSelectElement>("month");
    fireEvent.change(year, { target: { value: 2020 } });
    expect(year.value).toBe("2020");
    fireEvent.change(month, { target: { value: 10 } });
    expect(month.value).toBe("10");
  });

  it("職種ボタンをクリックするとbg-grayが適用される", () => {
    render(<UsersPage />);
    const departmentButton = screen.getByTestId("department_1");
    expect(departmentButton).toBeInTheDocument();
    user.click(departmentButton);
    expect(departmentButton).toHaveClass("active:bg-gray-200");
  });
  
  it("statusボタンをクリックするとbg-grayが適用される", () => {
    render(<UsersPage />);
    const statusButton = screen.getByTestId("status_1")
    expect(statusButton).toBeInTheDocument()
    user.click(statusButton);
    expect(statusButton).toHaveClass("active:bg-gray-200");
  });

  // UserListコンポーネントのテスト
  it("初期値に「入社日昇順」が設定されていることを確認", async () => {
    render(<UsersPage />);
    const selectElement = screen.getByRole<HTMLSelectElement>("option", {
      name: "入社日昇順",
    });
    expect(selectElement.value).toBe("入社日昇順");
  });

  it("ユーザーデータの初期表示（昇順）", () => {
    render(<UsersPage />);
    const entryDate = screen.getAllByTestId("entry_date");
    const firstEntryDate = entryDate[0].textContent;
    expect(firstEntryDate).toBe("2023-06-23");
    const lastEntryDate = entryDate[7].textContent;
    expect(lastEntryDate).toBe("2023-06-30");
  });
  it("ユーザーデータを降順に並べ替える", async () => {
    render(<UsersPage />);
    const selectElement =
      screen.getByTestId<HTMLSelectElement>("selectedOption");
    fireEvent.change(selectElement, { target: { value: "入社日降順" } });
    expect(selectElement.value).toBe("入社日降順");

    await screen.findAllByTestId("entry_date");
    const entryDate = screen.getAllByTestId("entry_date");
    expect(entryDate).toHaveLength(8);
    const firstDate = entryDate[0].textContent;
    expect(firstDate).toBe("2023-06-30");
    const firstEntryDate = entryDate[7].textContent;
    expect(firstEntryDate).toBe("2023-06-23");
  });
});
