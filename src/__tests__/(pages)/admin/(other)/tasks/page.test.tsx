import TasksPage from "@/app/(pages)/admin/(other)/tasks/page";
import { answer_requests, departments } from "@/const/tasks";
import { cleanup, render } from "@testing-library/react";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("タスク一覧画面", () => {
  afterAll(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it("スナップショットテスト", () => {
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce(() => ({
        ok: true,
        json: () => Promise.resolve({ departmentList: departments }),
      }))
      .mockResolvedValueOnce(() => ({
        ok: true,
        json: () => Promise.resolve(answer_requests),
      }));
    const { container } = render(
      <TasksPage searchParams={{ departmentId: "", searchKeyword: "" }} />
    );
    expect(container).toMatchSnapshot();
  });
});
