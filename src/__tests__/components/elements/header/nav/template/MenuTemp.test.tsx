import MenuTemp from "@/components/elements/header/nav/template/MenuTemp";
import { cleanup, render } from "@testing-library/react";

describe("MenuTemp.tsx", () => {
  beforeAll(() => {
    jest.clearAllMocks();
    cleanup();
  });
  afterAll(() => {
    jest.clearAllMocks();
    cleanup();
  });
  it("スナップショット", () => {
    const { container } = render(
      <MenuTemp text="テンプレート" href="hoge" src="/hoge" alt="テンプレート" />
    );
    expect(container).toMatchSnapshot();
  });
});
