import GeneralHeaderPage from "@/app/(pages)/(general)/(other)/@header/default";
import { render } from "@testing-library/react";

describe("一般ユーザー画面: @header/default.tsx", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
  it("スナップショット", () => {
    const { container } = render(<GeneralHeaderPage />);
    expect(container).toMatchSnapshot();
  });
});
