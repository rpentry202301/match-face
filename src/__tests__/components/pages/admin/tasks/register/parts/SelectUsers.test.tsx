import SelectUsers from "@/components/pages/admin/tasks/register/parts/SelectUsers";
import { UserSelectProvider } from "@/hooks/store/context/UserSelectContext";
import { render } from "@testing-library/react";

describe("SelectUsers.tsx", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });

  it("レンダリング時", () => {
    const {container} = render(<UserSelectProvider><SelectUsers /></UserSelectProvider>);
    expect(container).toMatchSnapshot();
  });
});
