import TextArea from "@/components/ui/TextArea";
import Image from "next/image";
import OrangeButton from "@/components/ui/button/OrangeButton";
import GrayButton from "@/components/ui/button/GrayButton";
import ConfirmationModal from "@/components/ui/ConfirmationModal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Comment } from "@/types/(general)/(other)/result/questions";

type Props = {
  admin_id: number;
  comment: Comment;
};

export const CommentContent = ({ admin_id, comment }: Props) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [currentComment, setComment] = useState(comment.context);
  const [error, setError] = useState(false);

  function checkLength() {
    if (currentComment.length > 300) {
      setError(true);
    } else {
      setError(false);
    }
  }

  return (
    <>
      <label htmlFor="comment">
        <h3 className="text-xl mb-3">▶︎コメントを入力する</h3>
      </label>
      <div className=" flex justify-between flex-wrap ">
        <div className="w-1/6 flex justify-center items-center">
          <Image
            src="/icon/user_icon.png"
            alt="コメントしたユーザーのアイコン"
            width={70}
            height={70}
          />
        </div>
        <div className="w-5/6">
          <TextArea
            id="comment"
            placeholder="コメントを入力してください"
            cols={50}
            rows={6}
            value={currentComment}
            onChange={(e) => {
              setComment(e.target.value);
              checkLength();
            }}
          />
          {error ? (
            <p className="text-red">※コメントは300文字以内で入力してください</p>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="flex justify-around my-20">
        <ConfirmationModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          message="コメントを送信してよろしいですか？"
          firstLabel="コメントを送信する"
          secondLabel="キャンセル"
          id="comment-modal"
        />
        {error ? (
          <GrayButton
            label="コメントを送信する"
            className="w-50 border rounded-none"
            onClick={() => setIsOpen(true)}
            disabled
          />
        ) : (
          <OrangeButton
            label="コメントを送信する"
            className="w-50 border rounded-none"
            onClick={() => setIsOpen(true)}
          />
        )}

        <GrayButton
          className="border rounded-none w-50"
          label="回答履歴一覧へ戻る"
          onClick={() => router.push("/admin/histories")}
        />
      </div>
    </>
  );
};
