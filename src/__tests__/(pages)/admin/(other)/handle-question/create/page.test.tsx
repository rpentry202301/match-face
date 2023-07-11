import { render, screen, fireEvent } from "@testing-library/react";
import CreateQuestionPage from "@/app/(pages)/admin/(other)/handle-question/create/page";
import React from "react";
import "@testing-library/jest-dom";

describe("質問・回答例作成画面テスト", () => {
  it("スナップショット", async () => {
    const { container } = render(<CreateQuestionPage />);
    expect(container).toMatchSnapshot();
  });

  it("記述式質問追加ボタンクリック", async () => {
    render(<CreateQuestionPage />);
    const addWriteButton = screen.getByTestId("addWriteButton");
    fireEvent.click(addWriteButton);
    expect(screen.getByTestId("write_1")).toHaveTextContent("Q1");
  });

  it("選択式質問追加ボタンクリック", async () => {
    render(<CreateQuestionPage />);
    const addSelectButton = screen.getByTestId("addSelectButton");
    fireEvent.click(addSelectButton);
    expect(screen.getByTestId("select_1")).toHaveTextContent("Q1");
  });

  it("一覧へ戻るボタンリンク", async () => {
    render(<CreateQuestionPage />);
    const backListButton = screen.getByTestId("backList");
    // fireEvent.click(editButton);
    expect(backListButton).toHaveAttribute("href", "/admin/handle-question");
  });

});
