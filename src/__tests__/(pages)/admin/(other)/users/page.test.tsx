import { render, screen, fireEvent } from "@testing-library/react";
import UsersPage from "@/app/(pages)/admin/(other)/users/page";
import React from "react";
import "@testing-library/jest-dom";

describe("ユーザー管理画面のテスト", () => {
  it("スナップショット", async () => {
    const { container } = render(<UsersPage />);
    expect(container).toMatchSnapshot();
  });

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
