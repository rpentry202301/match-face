import { ProjectContent } from "@/app/(pages)/(general)/(other)/testing/[id]/projectContent";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { project } from "@/const/testing";
import "@testing-library/jest-dom";

const user = userEvent.setup();

const testData = {
  id: 1,
};
const currentProject = project.filter((project) => project.id === testData.id);

describe("ProjectContentコンポーネントのテスト", () => {
  test("案件名と案件詳細が表示される", () => {
    render(<ProjectContent id={testData.id} />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent(`案件名:${currentProject[0].name}`);

    const project_detail = document.querySelector("#project_detail");
    expect(project_detail).toHaveTextContent(
      `${currentProject[0].project_detail}`
    );
  });
  test("下書きボタンをクリックするとモーダルが開き、キャンセルボタンをクリックするとモーダルが閉じる", async () => {
    render(<ProjectContent id={testData.id} />);
    //ボタンの存在を確認
    const button = screen.getByRole("button", { name: "下書きを保存する" });
    expect(button).toBeInTheDocument();
    // ボタンをクリックする前はモーダルが開いていないことを確認
    const modal_close = document.querySelector("#draft-modal");
    expect(modal_close).not.toBeInTheDocument();
    //ボタンをクリック
    await user.click(button);
    //モーダルが開いたことを確認
    const modal_open = document.querySelector("#draft-modal");
    expect(modal_open).toBeInTheDocument();
    //モーダル内のキャンセルボタンをクリック
    const modal_button = screen.getByRole("button", { name: "キャンセル" });
    await user.click(modal_button);
    // モーダルが閉じたことを確認
    const modal_clicked = document.querySelector("#draft-modal");
    expect(modal_clicked).not.toBeInTheDocument();
  });
  test("回答送信ボタンをクリックするとモーダルが開き、キャンセルボタンをクリックするとモーダルが閉じる", async () => {
    render(<ProjectContent id={testData.id} />);
    //ボタンの存在を確認
    const button = screen.getByRole("button", { name: "回答を送信する" });
    expect(button).toBeInTheDocument();
    // ボタンをクリックする前はモーダルが開いていないことを確認
    const modal_close = document.querySelector("#answer-modal");
    expect(modal_close).not.toBeInTheDocument();
    //ボタンをクリック
    await user.click(button);
    // モーダルが開いたことを確認
    const modal_open = document.querySelector("#answer-modal");
    expect(modal_open).toBeInTheDocument();
    //モーダル内のキャンセルボタンをクリック
    const modal_button = screen.getByRole("button", { name: "キャンセル" });
    await user.click(modal_button);
    //モーダルが閉じたことを確認
    const modal_clicked = document.querySelector("#answer-modal");
    expect(modal_clicked).not.toBeInTheDocument();
  });
  test("スナップショットテスト", () => {
    const { container } = render(<ProjectContent id={testData.id} />);
    expect(container).toMatchSnapshot();
  });
});
