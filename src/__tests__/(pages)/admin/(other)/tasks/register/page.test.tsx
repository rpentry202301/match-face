import TaskRegisterPage from "@/app/(pages)/admin/(other)/tasks/register/page";
import { render } from "@testing-library/react";

describe('タスク一覧画面', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(<TaskRegisterPage />);
  });
  afterAll(() => {
    jest.clearAllMocks();
  });

  it("レンダリング時", () => {
    const { container } = render(<TaskRegisterPage />);
    expect(container).toMatchSnapshot();
  });
});
