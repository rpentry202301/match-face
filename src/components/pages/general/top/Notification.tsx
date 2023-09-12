import { twMerge } from 'tailwind-merge';

type AnswerRequest = {
  id: number;
  user_id: number;
  administorator_id: number;
  project_id: number;
  request_at: string;
  deadline: string;
  answered: boolean;
  created_user: string;
  created_at: string;
  update_user: string;
  update_at: string;
};

type AnswerRequests = AnswerRequest[];

type MenuProps = {
  answeredAnswerRequests: AnswerRequests;
  notAnsweredAnswerRequests: AnswerRequests;
  className: string;
};

export default function Notification({
  // is_answered === trueのデータ
  answeredAnswerRequests,
  // is_answered === falseのデータ
  notAnsweredAnswerRequests,
  className,
}: MenuProps) {
  const mergedClassName = twMerge('p-5 w-3/5 h-auto shadow-lg', className);

  // notAnsweredAnswerRequestsのdeadlineを全て出す
  const deadlineDate = notAnsweredAnswerRequests.map((deadline) => {
    return deadline.deadline;
  });

  // deadlineDate内の日付の被りを無くす
  const deadlineArr = Array.from(new Set(deadlineDate));

  // データをdeadlineごとの配列にしてまとめる
  const filteredDeadline = deadlineArr.map((deadline) =>
    notAnsweredAnswerRequests.filter(
      (answerRequest) => answerRequest.deadline === deadline
    )
  );
  // // filteredDeadlineの配列内の各オブジェクトをループ処理(各オブジェクトのdeadlineの形式を変更)
  filteredDeadline.forEach((array) =>
    array.forEach((item) => {
      const deadlineDate = new Date(item.deadline);
      const year = deadlineDate.getFullYear();
      const month = String(deadlineDate.getMonth() + 1).padStart(2, '0');
      const day = String(deadlineDate.getDate()).padStart(2, '0');
      const formattedDeadline = `${year}年${month}月${day}日`;
      item.deadline = formattedDeadline;
    })
  );

  return (
    <>
      <div className={mergedClassName}>
        <h1 className="border-b-[2px] border-b-black shadow-md text-2xl text-left w-full font-bold h-12">
          進捗状況
        </h1>
        <div className="pt-5">
          <h2>【対応済】{answeredAnswerRequests.length}件</h2>
          <h2 className="pt-5">
            【未対応】{notAnsweredAnswerRequests.length}件
          </h2>

          {filteredDeadline.map((incompleted) => (
            <ul className="pl-5" key={incompleted[0].deadline}>
              <li className="pt-2">
                {incompleted[0].deadline}までに対応必須の項目が
                {incompleted.length}件あります
              </li>
            </ul>
          ))}
        </div>
      </div>
    </>
  );
}
