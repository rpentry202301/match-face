import { ProjectContent } from "./projectContent";

const TestPage = () => {
  return (
    <>
      <a href="/questions">
        <p className="m-5">◀︎ 質問一覧に戻る</p>
      </a>
      <div className="my-7 flex flex-col items-center">
        <ProjectContent id={1} />
      </div>
    </>
  );
};

export default TestPage;
