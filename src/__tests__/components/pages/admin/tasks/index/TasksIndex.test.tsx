import TasksIndex from "@/components/pages/admin/tasks/index/TasksIndex";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { answer_requests, departments } from "@/const/tasks";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

/**
 * @author Hayato Kobayashi
 * @note asyncコンポーネントのスナップショットテストは出来ない(公式にもissueあり)
 */
describe("TaskIndex.tsx", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    cleanup();
  });
  afterAll(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it("非同期通信が実施されたか", async () => {
    global.fetch = jest
      .fn()
      .mockImplementationOnce(() => ({
        ok: true,
        json: async () => ({
          departmentList: departments,
        }),
      }))
      .mockImplementationOnce(() => ({
        ok: true,
        json: async () => answer_requests,
      }));
    render(
      <>
        {await TasksIndex({
          searchParams: { departmentId: "", searchKeyword: "" },
        })}
      </>
    );
    await waitFor(() => {
      expect(fetch).toBeCalledTimes(2);
    });
  });
});
