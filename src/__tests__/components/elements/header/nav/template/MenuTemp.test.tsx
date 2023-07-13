import MenuTemp from "@/components/elements/header/nav/template/MenuTemp";
import { render } from "@testing-library/react";

describe("elements/header/nav/template/MenuTemp.tsx", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });

  it("スナップショット", () => {
    const { container } = render(
      <MenuTemp text="テンプレート" href="hoge" src="/hoge" alt="テンプレート" />
    );
    expect(container).toMatchSnapshot();
  });
});
