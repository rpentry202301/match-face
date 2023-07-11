import TaskRegisterIndex from "@/components/pages/admin/tasks/register/TaskRegisterIndex";
import { render } from "@testing-library/react";

describe("TaskRegisterIndex.tsx", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(<TaskRegisterIndex />);
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
  it("レンダリング時", () => {
    const { container } = render(<TaskRegisterIndex />);
    expect(container).toMatchSnapshot();
  });
});
