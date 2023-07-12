import QuestionsPage from "@/app/(pages)/(general)/(other)/questions/page";
import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import { data } from "@/const/questions";

describe("テーブル", () => {
  const testData = {
    id: "1",
    project_name: "ポムポムプリン",
    project_detail:
      "日本のサンリオによるゴールデン・レトリバーの男のコをモチーフにしたキャラクター。",
    answer_deadline: "2023/9/15",
    answer_status: true,
  };
  it("取得データの要素数+1個(見出しのtr)の<tr>が存在する", () => {
    render(<QuestionsPage />);
    const dataNumbers = data.length;
    const element = screen.getAllByRole("row");
    screen.debug(element);
    expect(element).toHaveLength(dataNumbers + 1);
  });
  it("回答期日が表示される", () => {
    render(<QuestionsPage />);
    const element = screen.getByText(testData.answer_deadline);
    screen.debug(element);
    expect(element).toBeInTheDocument();
  });
});
describe("ボタン", () => {
  const testData = {
    id: "1",
    project_name: "ポムポムプリン",
    project_detail:
      "日本のサンリオによるゴールデン・レトリバーの男のコをモチーフにしたキャラクター。",
    answer_deadline: "2023/9/15",
    answer_status: true,
  };
  it("true時のボタンの色が緑である", () => {
    render(<QuestionsPage />);
    const element = document.getElementById(`button-true-${testData.id}`);
    console.log(element);
    expect(element).toHaveClass("bg-green");
  });
});
