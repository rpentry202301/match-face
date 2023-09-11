import { twMerge } from 'tailwind-merge';

type AnswerRequest = {
  id: number;
  user_id: number;
  administorator_id: number;
  project_id: number;
  request_at: string;
  deadline: string;
  is_answered: boolean;
  created_user: string;
  created_at: string;
  update_user: string;
  update_at: string;
};

type AnswerRequests = AnswerRequest[];

type MenuProps = {
  completedData: AnswerRequests;
  incompletedData: AnswerRequests;
  className: string;
};

export default function Notification({
  // is_answered === trueのデータ
  completedData,
  // is_answered === falseのデータ
  incompletedData,
  className,
}: MenuProps) {
  const mergedClassName = twMerge('p-5 w-3/5 h-auto shadow-lg', className);

  // incompletedDataのdeadlineを全て出す
  const deadlineDate = incompletedData.map((deadline) => {
    return deadline.deadline;
  });

  // deadlineDate内の日付の被りを無くす
  const deadlineArr = Array.from(new Set(deadlineDate));

  // データをdeadlineごとの配列にしてまとめる
  const filteredDeadline = deadlineArr.map((deadline) =>
    incompletedData.filter(
      (answerRequest) => answerRequest.deadline === deadline
    )
  );

  // console.log('new Set(deadlineDate)', new Set(deadlineDate));
  // console.log('deadlineDate', deadlineDate);
  // console.log('deadlineArr', deadlineArr);
  // console.log('filteredDeadline', filteredDeadline);
  // const data = filteredDeadline.map((incompleted: any) => incompleted);
  // console.log('incompleted', data);

  return (
    <>
      <div className={mergedClassName}>
        <h1 className="border-b-[2px] border-b-black shadow-md text-2xl text-left w-full font-bold h-12">
          進捗状況
        </h1>
        <div className="pt-5">
          <h2 className="">【対応済】{completedData.length}件</h2>
          <h2 className="pt-5">【未対応】{incompletedData.length}件</h2>

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
