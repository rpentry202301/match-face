import { twMerge } from 'tailwind-merge';

type MenuProps = {
  title: string;
  completedTasksNumbers: number;
  incompletedTasksNumbers: number;
  deadlineDay: string;
  deadlineNumbers: number;
  className: string;
};

export default function Notification({
  title,
  completedTasksNumbers,
  incompletedTasksNumbers,
  deadlineDay,
  deadlineNumbers,
  className,
}: MenuProps) {
  //buttonのclassNameは親コンポーネントでclassNameを指定して上書き可能
  const mergedClassName = twMerge('p-5 w-1/2 h-auto shadow-lg', className);
  return (
    <>
      <div className={mergedClassName}>
        <h1 className="border-b-[2px] border-b-black shadow-md text-2xl text-left w-full font-bold h-12">
          {title}
        </h1>

        <div className="pt-5">
          {/* answer_statusがtrueの件数? */}
          <h2 className="">【対応済】{completedTasksNumbers}件</h2>
          {/* answer_statusがfalseの件数? */}
          <h2 className="pt-5">【未対応】{incompletedTasksNumbers}件</h2>
          {/* データ構造がはっきりしてから編集要*/}
          <ul className=" pl-5">
            <li className="pt-2">
              {deadlineDay}までに対応必須の項目が{deadlineNumbers}件あります
            </li>
            <li className="pt-2">
              {deadlineDay}までに対応必須の項目が{deadlineNumbers}件あります
            </li>
            <li className="pt-2">
              {deadlineDay}までに対応必須の項目が{deadlineNumbers}件あります
            </li>
            <li className="pt-2">
              {deadlineDay}までに対応必須の項目が{deadlineNumbers}件あります
            </li>
            <li className="pt-2">
              {deadlineDay}までに対応必須の項目が{deadlineNumbers}件あります
            </li>
            <li className="pt-2">
              {deadlineDay}までに対応必須の項目が{deadlineNumbers}件あります
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
