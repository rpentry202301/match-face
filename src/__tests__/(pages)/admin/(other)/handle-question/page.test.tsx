import { render, screen, fireEvent } from "@testing-library/react";
import HandleQuestionPage from "@/app/(pages)/admin/(other)/handle-question/page";
import React from "react";
import "@testing-library/jest-dom";

describe("質問・回答例一覧画面テスト", () => {
  it("スナップショット", async () => {
    const { container } = render(<HandleQuestionPage />);
    expect(container).toMatchSnapshot();
  });

  it("新規追加ボタンリンク", async () => {
    render(<HandleQuestionPage />);
    const createButton = screen.getByTestId("createButton");
    // fireEvent.click(createButton);
    expect(createButton).toHaveAttribute(
      "href",
      "/admin/handle-question/create"
    );
  });

  it("編集ボタンリンク", async () => {
    render(<HandleQuestionPage />);
    const editButton = screen.getByTestId("editButton_1");
    // fireEvent.click(editButton);
    expect(editButton).toHaveAttribute("href", "/admin/handle-question/edit/1");
  });
});
