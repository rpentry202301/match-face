import { AnswerContent } from "./answerContent";

const data = {
  user_id: "user1",
  project_id: 1,
  admin_id: "adminuser",
};

const ReviewPage = () => {
  return (
    <div className="flex flex-col items-center">
      <AnswerContent
        user_id={data.user_id}
        project_id={data.project_id}
        admin_id={data.admin_id}
      />
    </div>
  );
};

export default ReviewPage;
