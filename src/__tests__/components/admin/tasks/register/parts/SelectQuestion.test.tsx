import SelectQuestions from "@/components/pages/admin/tasks/register/parts/SelectQuestions";
import { render } from "@testing-library/react";

describe("SelectQuestions.tsx", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });

  it("レンダリング時", () => {
    const {container} = render(<SelectQuestions />);
    expect(container).toMatchSnapshot();
  });
});
