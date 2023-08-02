import { selecterReducer } from "@/hooks/store/reducer/selecterReducer";

describe("selecterReducer", () => {
  test("select: ユーザーを選択する", () => {
    const result = selecterReducer([], {
      type: "select",
      payload: ["田中太郎"]
    })

    expect(result).toEqual(["田中太郎"])
  })
})
