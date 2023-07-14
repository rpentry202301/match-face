import { render, screen, fireEvent } from "@testing-library/react";
import CreateQuestionPage from "@/app/(pages)/admin/(other)/handle-question/create/page";
import React from "react";
import "@testing-library/jest-dom";

describe("質問・回答例作成画面テスト", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(<CreateQuestionPage />);
  });
  afterAll(() => {
    jest.clearAllMocks();
  });

  it("スナップショット", async () => {
    const { container } = render(<CreateQuestionPage />);
    expect(container).toMatchSnapshot();
  });

  it("記述式質問追加ボタンクリック", async () => {
    const addWriteButton = screen.getByTestId("addWriteButton");
    fireEvent.click(addWriteButton);
    expect(screen.getByTestId("write_1")).toHaveTextContent("Q1");
  });

  it("選択式質問追加ボタンクリック", async () => {
    const addSelectButton = screen.getByTestId("addSelectButton");
    fireEvent.click(addSelectButton);
    expect(screen.getByTestId("select_1")).toHaveTextContent("Q1");
  });

  it("一覧へ戻るボタンリンク", async () => {
    const backListButton = screen.getByTestId("backList");
    // fireEvent.click(editButton);
    expect(backListButton).toHaveAttribute("href", "/admin/handle-question");
  });

  it("バリデーションテスト（記述式）", async () => {
    const addWriteButton = screen.getByTestId("addWriteButton");
    const sendButton = screen.getByTestId("sendButton");
    const errMsg = screen.getByTestId("errMsg");
    fireEvent.click(addWriteButton);
    fireEvent.click(sendButton);
    expect(errMsg).toHaveTextContent("未入力の項目があります");
  });

  it("バリデーションテスト（選択式）", async () => {
    const addSelectButton = screen.getByTestId("addSelectButton");
    const sendButton = screen.getByTestId("sendButton");
    const errMsg = screen.getByTestId("errMsg");
    fireEvent.click(addSelectButton);
    fireEvent.click(sendButton);
    expect(errMsg).toHaveTextContent("未入力の項目があります");
  });

  it("バリデーションテスト（質問未設定）", async () => {
    const projectName = screen.getByTestId("projectName");
    const projectDetail = screen.getByTestId("projectDetail");
    fireEvent.change(projectName, { target: { value: "test" } });
    fireEvent.change(projectDetail, { target: { value: "test" } });
    const sendButton = screen.getByTestId("sendButton");
    const errMsg = screen.getByTestId("errMsg");
    fireEvent.click(sendButton);
    expect(errMsg).toHaveTextContent("質問が設定されていません");
  });
});
