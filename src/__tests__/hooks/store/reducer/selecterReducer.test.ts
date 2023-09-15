import {
  UsersReducer,
  QusetionsReducer,
} from "@/hooks/store/reducer/selecterReducer";

describe("usersReducer", () => {
  test("select: ユーザーを選択する", () => {
    const result = UsersReducer([], {
      type: "select",
      payload: [{ id: "1", name: "" }],
    });

    expect(result).toEqual([{ id: "1", name: "" }]);
  });
  test("QuestionReducer", () => {
    const result = QusetionsReducer(
      { projectId: 0, list: [] },
      {
        type: "select",
        payload: { projectId: 1, list: [{ id: 1, name: "hoge" }] },
      }
    );

    expect(result).toEqual({ projectId: 1, list: [{ id: 1, name: "hoge" }] });
  });
});
