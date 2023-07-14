import WhiteCheckButton from "@/components/ui/button/WhiteCheckButton";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("WhiteCheckButton.tsx", () => {
  beforeAll(() => {
    jest.clearAllMocks();
    cleanup();
  });
  afterAll(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it("スナップショットテスト", () => {
    const { container } = render(<WhiteCheckButton label="テスト" />);
    expect(container).toMatchSnapshot();
  });

  describe("propsテスト", () => {
    beforeAll(() => {
      cleanup();
    });
    afterEach(() => {
      cleanup();
    });
    it("props.labelの通りに<button>にラベルがつく", () => {
      const labelTxt = "testing";
      render(<WhiteCheckButton label={labelTxt} />);
      const labeledBtn = screen.getByRole("button", { name: labelTxt });
      expect(labeledBtn).toBeInTheDocument();
    });
    it("twMergeが正常に動作している", () => {
      const addClass = "test-class";
      render(<WhiteCheckButton label="テスト" className={addClass} />);
      const Btn = screen.getByRole("button");
      expect(Btn).toHaveClass(addClass);
    });
  });

  describe("動作テスト", () => {
    beforeAll(() => {
      render(<WhiteCheckButton label="テスト" />);
    });
    afterAll(() => {
      cleanup();
    });
    it("ボタン押下時に表示が変わる", () => {
      fireEvent.click(screen.getByRole("button"));
      const button = screen.getByRole("button");
      // "translate-y-0.5"クラスがあれば押下時の表示になっている
      expect(button).toHaveClass("translate-y-0.5");
    });
  });
});
