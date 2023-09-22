import { ProjectContent } from "./projectContent";
import { cookies } from "next/headers";

const TestPage = ({ params }: { params: { id: string } }) => {
  const cookie = cookies();
  const user_id = cookie.get("userId")?.value;

  return (
    <>
      <a id="link-to-questions" href="/questions">
        <p className="m-5">◀︎ 質問一覧に戻る</p>
      </a>
      <div className="my-7 flex flex-col items-center">
        <ProjectContent id={Number(params.id)} user_id={Number(user_id)} />
      </div>
    </>
  );
};

export default TestPage;
