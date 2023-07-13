import { CommentContent } from "@/app/(pages)/(general)/(other)/result/[id]/comment";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Comment } from "@/const/result";

const testData = {
  user_id: "user1",
  project_id: "1",
  admin_user: "管理者太郎",
  img_url: "%2Ficon%2Fhuman_icon.png",
  comment: Comment[0],
};

describe("Commentコンポーネントテスト", () => {
  test("管理者の名前が表示される", () => {
    render(
      <CommentContent
        user_id={testData.user_id}
        project_id={testData.project_id}
      />
    );

    const heading = screen.getByRole("heading", {
      name: "管理者太郎からのコメント",
    });
    expect(heading).toBeInTheDocument();
  });

  test("管理者のアイコンが表示される", () => {
    render(
      <CommentContent
        user_id={testData.user_id}
        project_id={testData.project_id}
      />
    );

    //srcのURL指定方法については要検討
    const icon = screen.getByRole("img");
    expect(icon.getAttribute("src")).toContain(testData.img_url);
  });

  test("コメント内容が表示される", () => {
    render(
      <CommentContent
        user_id={testData.user_id}
        project_id={testData.project_id}
      />
    );

    const commentContents = document.querySelector("#comment");
    expect(commentContents).toHaveTextContent(testData.comment.content);
  });

  test("スナップショットテスト", () => {
    const contents = render(
      <CommentContent
        user_id={testData.user_id}
        project_id={testData.project_id}
      />
    );

    expect(contents).toMatchSnapshot();
  });
});
