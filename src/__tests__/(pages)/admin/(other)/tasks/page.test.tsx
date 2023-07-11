import TasksPage from "@/app/(pages)/admin/(other)/tasks/page";
import { render } from "@testing-library/react";

describe('タスク一覧画面', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(<TasksPage />);
  });
  afterAll(() => {
    jest.clearAllMocks();
  });

  it("レンダリング時", () => {
    const { container } = render(<TasksPage />);
    expect(container).toMatchSnapshot();
  });
});
