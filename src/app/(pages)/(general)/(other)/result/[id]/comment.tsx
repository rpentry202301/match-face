import { User } from "@/const/result";
import { Comment } from "@/types/(general)/(other)/result/questions";
import Image from "next/image";

export const CommentContent = ({ comment }: { comment: Comment }) => {
  return (
    <>
      <h3 className="text-xl mb-3">
        {comment.commentAdministrator}からのコメント
      </h3>
      <div className="border border-black rounded-md p-3 flex justify-between ">
        <div className="w-1/6 flex justify-center items-center">
          <Image
            src="/icon/user_icon.png"
            alt="コメントしたユーザーのアイコン"
            width={70}
            height={70}
            priority
          />
        </div>
        <div id="comment" className="w-5/6">
          {comment.context}
        </div>
      </div>
    </>
  );
};
