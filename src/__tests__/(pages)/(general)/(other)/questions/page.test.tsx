import QuestionsPage from "@/app/(pages)/(general)/(other)/questions/page";
import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import { data } from "@/const/questions";

test("テーブル", () => {
  it("取得データの要素数+1個(見出しのtr)の<tr>が存在する", () => {
    render(<QuestionsPage />);
    const dataNumbers = data.length;
    const element = screen.getAllByRole("row");
    screen.debug(element);
    expect(element).toHaveLength(dataNumbers + 1);
  });
});
