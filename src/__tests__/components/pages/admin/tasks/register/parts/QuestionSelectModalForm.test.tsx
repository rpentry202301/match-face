import QuestionSelectModalForm from "@/components/pages/admin/tasks/register/parts/QuestionSelectModalForm";
import { SelectedQuestionProvider } from "@/hooks/store/context/SelectedQuestionContext";
import { screen, render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

export const fetchData = {
  departments: [
    {
      id: 1,
      name: "Java",
      createdUser: "初期設定",
      createdAt: "2023-09-07T09:29:00.130462",
      updateUser: "初期設定",
      updateAt: "2023-09-07T09:29:00.130462",
    },
    {
      id: 2,
      name: "PHP",
      createdUser: "初期設定",
      createdAt: "2023-09-07T09:29:00.130462",
      updateUser: "初期設定",
      updateAt: "2023-09-07T09:29:00.130462",
    },
    {
      id: 3,
      name: "FR",
      createdUser: "初期設定",
      createdAt: "2023-09-07T09:29:00.130462",
      updateUser: "初期設定",
      updateAt: "2023-09-07T09:29:00.130462",
    },
    {
      id: 4,
      name: "CL",
      createdUser: "初期設定",
      createdAt: "2023-09-07T09:29:00.130462",
      updateUser: "初期設定",
      updateAt: "2023-09-07T09:29:00.130462",
    },
    {
      id: 5,
      name: "ML",
      createdUser: "初期設定",
      createdAt: "2023-09-07T09:29:00.130462",
      updateUser: "初期設定",
      updateAt: "2023-09-07T09:29:00.130462",
    },
    {
      id: 6,
      name: "QA",
      createdUser: "初期設定",
      createdAt: "2023-09-07T09:29:00.130462",
      updateUser: "初期設定",
      updateAt: "2023-09-07T09:29:00.130462",
    },
  ],
  skills: [
    {
      id: 1,
      name: "JavaScript",
      createdUser: "テスト用",
      createdAt: "2023-09-07T09:30:18.99969",
      updateUser: "テスト用",
      updateAt: "2023-09-07T09:30:18.99969",
    },
    {
      id: 2,
      name: "TypeScript",
      createdUser: "テスト用",
      createdAt: "2023-09-07T09:30:18.99969",
      updateUser: "テスト用",
      updateAt: "2023-09-07T09:30:18.99969",
    },
    {
      id: 3,
      name: "React",
      createdUser: "テスト用",
      createdAt: "2023-09-07T09:30:18.99969",
      updateUser: "テスト用",
      updateAt: "2023-09-07T09:30:18.99969",
    },
    {
      id: 4,
      name: "Next.js",
      createdUser: "テスト用",
      createdAt: "2023-09-07T09:30:18.99969",
      updateUser: "テスト用",
      updateAt: "2023-09-07T09:30:18.99969",
    },
  ],
  questions: [
    {
      id: 1,
      projectId: 1,
      projectName: "バックエンド案件",
      context: "開発経験について教えてください。",
      createdUser: "",
      createdAt: "-999999999-01-01T00:00:00",
      updateUser: "テスト花子",
      updateAt: "2023-09-07T09:29:24.412579",
    },
    {
      id: 2,
      projectId: 1,
      projectName: "バックエンド案件",
      context: "1番得意な言語は何ですか。",
      createdUser: "",
      createdAt: "-999999999-01-01T00:00:00",
      updateUser: "テスト花子",
      updateAt: "2023-09-07T09:29:24.412579",
    },
  ],
  projects: [
    { id: 1, name: "バックエンド案件" },
    { id: 2, name: "フロントエンド案件" },
  ],
};

// モーダル展開用関数
const open = () => {
  render(
    <SelectedQuestionProvider>
      <QuestionSelectModalForm fetchData={fetchData} />
    </SelectedQuestionProvider>
  );
  fireEvent.click(screen.getByRole("button"));
};

describe("QuestionSelectModal.tsx", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    open();
  });

  describe("スナップショットテスト", () => {
    it("モーダルを開いている状態(案件未選択)", () => {
      const { baseElement } = render(
        <SelectedQuestionProvider>
          <QuestionSelectModalForm fetchData={fetchData} />
        </SelectedQuestionProvider>
      );
      expect(baseElement).toMatchSnapshot(); // よく分からんエラー出るけど無視して可
    });
  });

  describe("入力テスト", () => {
    it("案件選択テスト", () => {
      // ここでテスト出来るので、SelectProjects.tsxの単体テストは不要
      render(
        <SelectedQuestionProvider>
          <QuestionSelectModalForm fetchData={fetchData} />
        </SelectedQuestionProvider>
      );
      const no_projects = screen.getByText("案件名を選択して下さい");
      fireEvent.click(screen.getByTestId("pj-select"));
      fireEvent.click(screen.getByTestId("pj-1"));
      // question_id = 1のデータ(project_id = 1)をテスト
      expect(screen.getByTestId("Q-1")).toBeInTheDocument();
      expect(no_projects).not.toBeInTheDocument();
    });
    it("検索ボックスの入力テスト", async () => {
      render(
        <SelectedQuestionProvider>
          <QuestionSelectModalForm fetchData={fetchData} />
        </SelectedQuestionProvider>
      );
      const input = screen.getByTestId("search-box") as HTMLInputElement;
      fireEvent.change(input, { target: { value: "案件" } });
      expect(input.value).toBe("案件");
    });
  });

  it("部署のチェックボックステスト", async () => {
    const user = userEvent.setup();
    render(
      <SelectedQuestionProvider>
        <QuestionSelectModalForm fetchData={fetchData} />
      </SelectedQuestionProvider>
    );
    const beforeCheck = screen.getByTestId("check-box:FR") as HTMLInputElement;
    expect(beforeCheck.checked).toBe(false);
    // Javaを選択してテスト
    await user.click(screen.getByTestId("check-box:FR"));
    const afterCheck = screen.getByTestId("check-box:FR") as HTMLInputElement;
    expect(afterCheck.checked).toBe(true);
  });
});
