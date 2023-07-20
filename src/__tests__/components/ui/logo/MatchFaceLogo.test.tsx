import MatchFaceLogo from "@/components/ui/logo/MatchFaceLogo";
import { cleanup, render } from "@testing-library/react";

describe("MatchFacelogo.tsx", () => {
  beforeAll(() => {
    jest.clearAllMocks();
    cleanup();
  });
  afterAll(() => {
    jest.clearAllMocks();
    cleanup();
  });
  
  it("スナップショット", () => {
    const { container } = render(<MatchFaceLogo />);
    expect(container).toMatchSnapshot();
  });
});
