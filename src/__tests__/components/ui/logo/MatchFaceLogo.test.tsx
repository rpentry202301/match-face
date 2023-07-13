import MatchFaceLogo from "@/components/ui/logo/MatchFaceLogo";
import { render } from "@testing-library/react";

describe("MatchFacelogo.tsx", () => {
  it("スナップショット", () => {
    const { container } = render(<MatchFaceLogo />);
    expect(container).toMatchSnapshot();
  });
});
