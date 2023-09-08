import UserSelectModal from "@/components/pages/admin/tasks/register/UserSelectModal";
import { UserSelectProvider } from "@/hooks/store/context/UserSelectContext";
import { userSelectModalFetchedData } from "./parts/UserSelectModalForm.test";
import { render, waitFor } from "@testing-library/react";

// スナップショットはフォームのコンポーネント側で撮るので、ここではテストしない
describe("UserSelectModal.tsx", () => {
  it("fetchが呼ばれているかテスト" , async () => {
    global.fetch = jest.fn().mockImplementation((url: string) => {
      if (url.indexOf("departments") !== -1) {
        return {
          ok: true,
          json: async () => ({
            departmentList: userSelectModalFetchedData.departments,
          }),
        };
      } else if (url.indexOf("statuses") !== -1) {
        return {
          ok: true,
          json: async () => ({
            statusList: userSelectModalFetchedData.statuses,
          }),
        };
      } else if (url.indexOf("user_groups") !== -1) {
        return {
          ok: true,
          json: async () => ({
            groupList: userSelectModalFetchedData.userGroups,
          }),
        };
      } else if (url.indexOf("users") !== -1) {
        return {
          ok: true,
          json: async () => ({
            userList: userSelectModalFetchedData.users,
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
  
