import { CommentContent } from "@/app/(pages)/admin/(other)/review/[id]/comment";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

const testData = {
  admin_id: 9999,
  img_url: "%2Ficon%2Fhuman_icon.png",
};

describe("CommentContentコンポーネントのテスト", () => {
  render(<CommentContent admin_id={testData.admin_id} />);
  test("コメントしたユーザーのアイコンが表示される", () => {
    const icon = screen.getByRole("img");
    expect(icon.getAttribute("src")).toContain(testData.img_url);
  });
  test("スナップショットテスト", () => {
    const { container } = render(
      <CommentContent admin_id={testData.admin_id} />
    );
    expect(container).toMatchSnapshot();
  });
});
