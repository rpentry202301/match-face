import UserSelectModal from "@/components/pages/admin/tasks/register/UserSelectModal";
import { UserSelectProvider } from "@/hooks/store/context/UserSelectContext";
import { render, waitFor } from "@testing-library/react";

// コンポーネント内では初期表示用のfetchは無いので、ダミーデータを渡しています

describe("UserSelectModal.tsx", () => {
  it("fetchが呼ばれているかテスト" , async () => {
    global.fetch = jest.fn().mockImplementation((url: string) => {
      if (url.indexOf("departments") !== -1) {
        return {
          ok: true,
          json: async () => ({
            departmentList: [
              { id: 1, name: "部署1" },
              { id: 2, name: "部署2" },
            ],
          }),
        };
      } else if (url.indexOf("statuses") !== -1) {
        return {
          ok: true,
          json: async () => ({
            statusList: [
              { id: 1, name: "ステータス1" },
              { id: 2, name: "ステータス2" },
            ],
          }),
        };
      } else if (url.indexOf("user_groups") !== -1) {
        return {
          ok: true,
          json: async () => ({
            groupList: [
              { id: 1, name: "グループ1" },
              { id: 2, name: "グループ2" },
            ],
          }),
        };
      } else if (url.indexOf("users") !== -1) {
        return {
          ok: true,
          json: async () => ({
            userList: [
              { id: 1, name: "ユーザー1" },
              { id: 2, name: "ユーザー2" },
            ],
          }),
        };
      }
    });

    render(
      <UserSelectProvider>
        {await UserSelectModal()}
      </UserSelectProvider>
    )

    await waitFor(() => {
      expect(fetch).toBeCalledTimes(4)
    })
  })
})
  
