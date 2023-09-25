import { QuestionsContent } from "./questionsContent";
import { cookies } from "next/headers";

const QuestionsPage = () => {
  const cookie = cookies();
  const userId = cookie.get("userId")?.value;
  return (
    <>
      <div>
        <QuestionsContent userId={Number(userId)} />
      </div>
    </>
  );
};

export default QuestionsPage;
