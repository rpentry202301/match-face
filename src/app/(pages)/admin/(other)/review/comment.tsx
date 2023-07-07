import TextArea from "@/components/ui/TextArea";
import { Comment } from "@/const/review";
import { User } from "@/const/review";
import Image from "next/image";

type Props = {
  user_id: string;
  project_id: number;
};

export const CommentContent = ({ user_id, project_id }: Props) => {
  const currentComment = Comment.filter(
    (comment) => comment.user_id === user_id && project_id === project_id
  );
  const commentUser = User.filter(
    (user) => user.id === currentComment[0].admin_id
  );

  return (
    <>
      <h3 className="text-xl mb-3">{commentUser[0].name}からのコメント</h3>
      <div className="border border-black rounded-md p-3 flex justify-between ">
        <div className="w-1/6 flex justify-center items-center">
          <Image
            src={commentUser[0].image_url}
            alt="コメントしたユーザーのアイコン"
            width={70}
            height={70}
          />
        </div>
        <div className="w-5/6">{currentComment[0].content}</div>
      </div>
    </>
  );
};
