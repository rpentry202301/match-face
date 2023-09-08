import { render, screen, fireEvent } from "@testing-library/react";
import EditQuestionPage from "@/app/(pages)/admin/(other)/handle-question/edit/[id]/page";
import React from "react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

describe("質問・回答例編集画面テスト", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(<EditQuestionPage params={{id:'1'}}/>);
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
  
  it("スナップショット", async () => {
    const { container } = render(<EditQuestionPage params={{id:'1'}}/>);
    expect(container).toMatchSnapshot();
  });

  it("記述式質問追加ボタンクリック", async () => {
    const addWriteButton = screen.getByTestId("addWriteButton");
    fireEvent.click(addWriteButton);
    expect(screen.getByTestId("write_4")).toHaveTextContent("Q4");
  });

  it("選択式質問追加ボタンクリック", async () => {
    const addSelectButton = screen.getByTestId("addSelectButton");
    fireEvent.click(addSelectButton);
    expect(screen.getByTestId("select_4")).toHaveTextContent("Q4");
  });

  it("一覧へ戻るボタンリンク", async () => {
    const backListButton = screen.getByTestId("backList");
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
});
