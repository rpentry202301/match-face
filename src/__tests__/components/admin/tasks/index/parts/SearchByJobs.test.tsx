import SearchByJobs from "@/components/pages/admin/tasks/index/parts/SearchByJobs";
import { render } from "@testing-library/react";

describe("TaskList.tsx", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('レンダリング時', () => {
    const {container} = render(<SearchByJobs />);
    expect(container).toMatchSnapshot();
  });
});
