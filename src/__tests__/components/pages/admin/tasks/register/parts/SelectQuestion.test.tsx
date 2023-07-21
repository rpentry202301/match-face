import SelectQuestions from "@/components/pages/admin/tasks/register/parts/SelectQuestions";
import { SelectedQuestionProvider } from "@/hooks/store/context/SelectedQuestionContext";
import { render } from "@testing-library/react";

describe("SelectQuestions.tsx", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });

  it("レンダリング時", () => {
    const {container} = render(
      <SelectedQuestionProvider>
        <SelectQuestions />
      </SelectedQuestionProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
