import QuestionList from "@/components/pages/admin/tasks/register/parts/QuestionList";
import { render } from "@testing-library/react";

const questionList = [
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
];

describe("Question.tsx", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("QuestionListのスナップショット", () => {
    const { container } = render(
      <QuestionList
        questions={questionList}
        checkedValues={{
          projectId: 1,
          list: [{ id: 1, name: "開発経験について教えてください。" }],
        }}
        onChange={jest.fn()}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
