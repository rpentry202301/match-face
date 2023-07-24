import Loading from "@/components/elements/loading/Loading";
import { cleanup, render } from "@testing-library/react";

describe("Loading.tsx", () => {
  beforeEach(() => {
    cleanup();
  });
  afterAll(() => {
    cleanup();
  });
  it("スナップショットテスト", () => {
    const { container } = render(<Loading />);
    expect(container).toMatchSnapshot();
  });
});
