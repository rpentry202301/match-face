import { QuestionsContent } from "./questionsContent";
import { cookies } from "next/headers";

const QuestionsPage = () => {
  const cookie = cookies();
  const userId = cookie.get("userId")?.value;
  return (
    <>
      <div className="my-7 flex flex-col items-center">
        <QuestionsContent userId={Number(userId)} />
      </div>
    </>
  );
};

export default QuestionsPage;
