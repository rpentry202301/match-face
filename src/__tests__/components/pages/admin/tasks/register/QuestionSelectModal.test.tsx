import QuestionSelectModal from "@/components/pages/admin/tasks/register/QuestionSelectModal ";
import { SelectedQuestionProvider } from "@/hooks/store/context/SelectedQuestionContext";
import { fetchData } from "./parts/ QuestionSelectModalForm.test";
import { render, waitFor } from "@testing-library/react";

// スナップショットはフォームのコンポーネント側で撮るので、ここではテストしない
describe("UserSelectModal.tsx", () => {
  it("fetchが呼ばれているかテスト" , async () => {
    global.fetch = jest.fn().mockImplementation((url: string) => {
      if (url.indexOf("departments") !== -1) {
        console.log(url)
        return {
          ok: true,
          json: async () => ({
            departmentList: fetchData.departments,
          }),
        };
      } else if (url.indexOf("skills") !== -1) {
        console.log(url)
        return {
          ok: true,
          json: async () => ({
            skillList: fetchData.skills,
          }),
        };
      } else if (url.indexOf("questions") !== -1) {
        console.log(url)
        return {
          ok: true,
          json: async () => ({
            questionList: fetchData.questions,
          }),
        };
      }
    });

    render(
      <SelectedQuestionProvider>
        {await QuestionSelectModal()}
      </SelectedQuestionProvider>
    )

    await waitFor(() => {
      expect(fetch).toBeCalledTimes(3)
    })
  })
})
  
