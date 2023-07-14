import WhiteButton from "@/components/ui/button/WhiteButton";
import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("WhiteButton.tsx", () => {
  beforeAll(() => {
    jest.clearAllMocks();
    cleanup();
  });
  afterAll(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it("スナップショットテスト", () => {
    const { container } = render(<WhiteButton label="テスト" />);
    expect(container).toMatchSnapshot();
    cleanup();
  });
  describe("propsテスト", () => {
    afterEach(() => {
      cleanup();
    });
    it("props.label", () => {
      render(<WhiteButton label="testing" />);
      const LabeledBtn = screen.getByRole("button", { name: "testing" });
      expect(LabeledBtn).toBeInTheDocument();
    });
    it("props.error", () => {
      // クラスに"border-red-600" "text-red-600"があるかテスト
      render(<WhiteButton label="テスト" error={true} />);
      const ErrorBtn = screen.getByRole("button");
      expect(ErrorBtn).toHaveClass("border-red-600");
      expect(ErrorBtn).toHaveClass("text-red-600");
    });
    it("その他のComponentProps", () => {
        // Reactコンポーネントが標準搭載しているpropsが渡せるか
        // propsにclassNameを渡してテスト(twMergeもついでにテスト)
        render(<WhiteButton label="テスト" className="test-class" />);
        const ErrorBtn = screen.getByRole("button");
        expect(ErrorBtn).toHaveClass("test-class");
      });
  });
});
