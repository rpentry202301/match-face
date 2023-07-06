import TextArea from "@/components/ui/TextArea";

export const CommentContent = () => {
  return (
    <>
      <h2>コメント</h2>
      <TextArea id="comment" name="comment" cols={50} rows={6} />
    </>
  );
};
