import { AnswerContent } from "./answerContent";

const ReviewPage = ({
  params,
}: {
  params: { user_id: string; project_id: string; admin_id: string };
}) => {
  return (
    <div className="flex flex-col items-center">
      <AnswerContent
        user_id={params.user_id}
        project_id={params.project_id}
        admin_id={params.admin_id}
      />
    </div>
  );
};

export default ReviewPage;
