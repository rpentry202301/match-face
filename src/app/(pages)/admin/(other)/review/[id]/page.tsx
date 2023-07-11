import { AnswerContent } from "./answerContent";

const ReviewPage = ({ params }: { params: { id: string } }) => {
  const user_id = "user1";
  const admin_id = "adminuser";

  return (
    <div className="flex flex-col items-center">
      <AnswerContent
        user_id={user_id}
        project_id={params.id}
        admin_id={admin_id}
      />
    </div>
  );
};

export default ReviewPage;
