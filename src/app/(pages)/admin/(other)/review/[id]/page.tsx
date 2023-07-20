import { AnswerContent } from "./answerContent";

const ReviewPage = ({ params }: { params: { id: number } }) => {
  const user_id = 1;
  const admin_id = 9999;

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
