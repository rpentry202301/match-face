import SelectDeadline from "@/components/pages/admin/tasks/register/parts/SelectDeadline";
import { render } from "@testing-library/react";

describe("SelectDeadline.tsx", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });

  it("レンダリング時", () => {
    const {container} = render(<SelectDeadline />);
    expect(container).toMatchSnapshot();
  });
});
