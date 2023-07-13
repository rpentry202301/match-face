import TestPage from "@/app/(pages)/(general)/(other)/testing/[id]/page";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

const testData = {
  id: "1",
};

describe("testingページのテスト", () => {
  test("/questonsへのリンクが正しく設定されているか", () => {
    render(<TestPage params={{ id: testData.id }} />);
    const link = document.querySelector("#link-to-questions");
    expect(link?.getAttribute("href")).toEqual("/questions");
  });
  test("スナップショットテスト", () => {
    const { container } = render(<TestPage params={{ id: testData.id }} />);
    expect(container).toMatchSnapshot();
  });
});
