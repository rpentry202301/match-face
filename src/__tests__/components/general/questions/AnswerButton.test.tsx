import { render, screen } from "@testing-library/react";
import AnswerButton from "@/components/pages/general/questions/AnswerButton";
import "@testing-library/jest-dom";
test("AnswerButtonのスナップショット", () => {
  const view = render(<AnswerButton />);
  expect(view.container).toMatchSnapshot();
});

test("answerdがtrueの場合、ボタンの色がgreenでlabelが「確認する」になる", () => {
  render(<AnswerButton answered={true} />);
  const buttonElement = screen.getByRole("button");
  const label = screen.getByText("確認する")
  expect(buttonElement).toHaveClass("bg-green");
  expect(label).toBeInTheDocument()
});
test("answerdがfalseの場合、ボタンの色がredでlabelが「回答する」になる", () => {
  render(<AnswerButton answered={false} />);
  const buttonElement = screen.getByRole("button");
  const label = screen.getByText("回答する")
  expect(buttonElement).toHaveClass("bg-red");
  expect(label).toBeInTheDocument()
});
