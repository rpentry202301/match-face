import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProjectTable from "@/components/pages/admin/answerManage/projectTable";
import React from "react";
import { SelectProvider } from "@/hooks/store/context/HandleQuestionContext";
import "@testing-library/jest-dom";

type Project = {
  createdAt: string;
  createdUser: string;
  deleted: boolean;
  departmentId: number;
  detail: string;
  enterpriseId: number;
  id: number;
  name: string;
  questionList: any[];
  updateAt: string;
  updateUser: string;
};

const mockData = [
  {
    id: 4,
    name: "test案件",
    detail: "販促アプリの新規開発、既存システムの保守・運用。",
    enterpriseId: 0,
    departmentId: 0,
    questionList: [],
    createdUser: "テスト花子",
    createdAt: "2023-09-04T16:59:11.203322",
    updateUser: "テスト花子",
    updateAt: "2023-09-04T16:59:11.203322",
    deleted: false,
  },
  {
    id: 1,
    name: "バックエンド案件",
    detail: "販促アプリの新規開発、既存システムの保守・運用。",
    enterpriseId: 0,
    departmentId: 0,
    questionList: [],
    createdUser: "テスト花子",
    createdAt: "2023-09-04T10:35:01.831993",
    updateUser: "テスト花子",
    updateAt: "2023-09-04T10:35:01.831993",
    deleted: false,
  },
];

describe("質問・回答例一覧画面テスト", () => {
  beforeEach(() => {
    const mockFetchPromise = Promise.resolve({
      json: () => Promise.resolve(mockData),
    });

    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("スナップショット", async () => {
    const { container } = render(
      <SelectProvider>
        <ProjectTable />
      </SelectProvider>
    );
    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });
});
