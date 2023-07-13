import { render, screen, fireEvent } from "@testing-library/react";
import EditQuestionPage from "@/app/(pages)/admin/(other)/handle-question/edit/[id]/page";
import React from "react";
import "@testing-library/jest-dom";

describe("質問・回答例編集画面テスト", () => {
  it("スナップショット", async () => {
    const { container } = render(<EditQuestionPage />);
    expect(container).toMatchSnapshot();
  });

  it("記述式質問追加ボタンクリック", async () => {
    render(<EditQuestionPage />);
    const addWriteButton = screen.getByTestId("addWriteButton");
    fireEvent.click(addWriteButton);
    expect(screen.getByTestId("write_4")).toHaveTextContent("Q4");
  });

  it("選択式質問追加ボタンクリック", async () => {
    render(<EditQuestionPage />);
    const addSelectButton = screen.getByTestId("addSelectButton");
    fireEvent.click(addSelectButton);
    expect(screen.getByTestId("select_4")).toHaveTextContent("Q4");
  });

  it("一覧へ戻るボタンリンク", async () => {
    render(<EditQuestionPage />);
    const backListButton = screen.getByTestId("backList");
    // fireEvent.click(editButton);
    expect(backListButton).toHaveAttribute("href", "/admin/handle-question");
  });


});
