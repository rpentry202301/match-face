import { render, screen, fireEvent } from "@testing-library/react";
import HandleQuestionPage from "@/app/(pages)/admin/(other)/handle-question/page";
import React from "react";
import { SelectProvider } from "@/hooks/store/context/HandleQuestionContext";
import "@testing-library/jest-dom";

describe("質問・回答例一覧画面テスト", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(
      <SelectProvider>
        <HandleQuestionPage />
      </SelectProvider>
    );
  });
  afterAll(() => {
    jest.clearAllMocks();
  });

  it("スナップショット", async () => {
    const { container } = render(
      <SelectProvider>
        <HandleQuestionPage />
      </SelectProvider>
    );
    expect(container).toMatchSnapshot();
  });

  it("新規追加ボタンリンク", async () => {
    const createButton = screen.getByTestId("createButton");
    // fireEvent.click(createButton);
    expect(createButton).toHaveAttribute(
      "href",
      "/admin/handle-question/create"
    );
  });

  it("編集ボタンリンク", async () => {
    const editButton = screen.getByTestId("editButton_1");
    // fireEvent.click(editButton);
    expect(editButton).toHaveAttribute("href", "/admin/handle-question/edit/1");
  });

  it("Java絞り込み実行", async () => {
    const addWriteButton = screen.getByTestId("button-Java");
    const refineButton = screen.getByTestId("button-refine");
    const table = screen.getByTestId("projectTable");
    const descendant = screen.getByTestId("test2");
    const nonExistElement = screen.getByTestId("test1");
    fireEvent.click(addWriteButton);
    fireEvent.click(refineButton);
    //テーブル内にJava属性を持つ行が表示されているか
    expect(table).toContainElement(descendant)
    expect(descendant).not.toContainElement(table)
    //テーブル内にJava属性を持たない行が表示されていないか
    expect(table).not.toContainElement(nonExistElement)
  });

  it("PHP絞り込み&ワード検索実行", async () => {
    const addWriteButton = screen.getByTestId("button-PHP");
    const searchInput = screen.getByTestId("input-search");
    const refineButton = screen.getByTestId("button-refine");
    const table = screen.getByTestId("projectTable");
    const descendant = screen.getByTestId("test3");
    const nonExistElement = screen.getByTestId("test4");
    fireEvent.change(searchInput, { target: { value: "test3" } });
    fireEvent.click(addWriteButton);
    fireEvent.click(refineButton);
    //テーブル内にPHP属性かつtest3の行が表示されているか
    expect(table).toContainElement(descendant)
    expect(descendant).not.toContainElement(table)
    //テーブル内にPHP属性かつtest3を持たない行が表示されていないか
    expect(table).not.toContainElement(nonExistElement)
  });

  it("ワード検索実行", async () => {
    const searchInput = screen.getByTestId("input-search");
    const refineButton = screen.getByTestId("button-search");
    const table = screen.getByTestId("projectTable");
    const descendant = screen.getByTestId("test3");
    const nonExistElement = screen.getByTestId("test1");
    fireEvent.change(searchInput, { target: { value: "test3" } });
    fireEvent.click(refineButton);
    //テーブル内にtest3の行が表示されているか
    expect(table).toContainElement(descendant)
    expect(descendant).not.toContainElement(table)
    //テーブル内にtest3を持たない行が表示されていないか
    expect(table).not.toContainElement(nonExistElement)
  });
});
