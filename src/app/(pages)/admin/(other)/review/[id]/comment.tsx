import TextArea from "@/components/ui/TextArea";
import { User } from "@/const/review";
import Image from "next/image";
import { useState } from "react";

type Props = {
  admin_id: number;
};

export const CommentContent = ({ admin_id }: Props) => {
  const commentUser = User.filter((user) => user.id === admin_id);
  const [comment, setComment] = useState("");

  return (
    <>
      <label htmlFor="comment">
        <h3 className="text-xl mb-3">▶︎コメントを入力する</h3>
      </label>
      <div className=" flex justify-between ">
        <div className="w-1/6 flex justify-center items-center">
          <Image
            src={commentUser[0].image_url}
            alt="コメントしたユーザーのアイコン"
            width={70}
            height={70}
          />
        </div>
        <TextArea
          id="comment"
          cols={50}
          rows={6}
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
      </div>
    </>
  );
};
