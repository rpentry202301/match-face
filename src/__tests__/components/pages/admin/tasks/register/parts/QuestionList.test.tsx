import QuestionList from "@/components/pages/admin/tasks/register/parts/QuestionList";
import { render } from "@testing-library/react";

describe("Question.tsx", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("QuestionListのスナップショット", () => {
    const { container } = render(<QuestionList />);
    expect(container).toMatchSnapshot();
  });
})
