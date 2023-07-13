import { ProjectContent } from "./projectContent";

const TestPage = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <a href="/questions">
        <p id="link-to-questions" className="m-5">
          ◀︎ 質問一覧に戻る
        </p>
      </a>
      <div className="my-7 flex flex-col items-center">
        <ProjectContent id={params.id} />
      </div>
    </>
  );
};

export default TestPage;
