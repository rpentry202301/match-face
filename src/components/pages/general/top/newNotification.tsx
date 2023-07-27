import { twMerge } from 'tailwind-merge';

type MenuProps = {
  completedTasksNumbers: number;
  incompletedTasksNumbers: number;
  deadlineDay: string;
  deadlineNumbers: number;
  className: string;
};

export default function Notification({
  completedTasksNumbers,
  incompletedTasksNumbers,
  deadlineDay,
  deadlineNumbers,
  className,
}: MenuProps) {
  //buttonのclassNameは親コンポーネントでclassNameを指定して上書き可能
  const mergedClassName = twMerge('p-5 w-3/5 h-auto shadow-lg', className);
  return (
    <>
      <div className={mergedClassName}>
        <h1 className="border-b-[2px] border-b-black shadow-md text-2xl text-left w-full font-bold h-12">
          進捗状況
        </h1>

        <div className="pt-5">
          <h2 className="">【対応済】{completedTasksNumbers}件</h2>
          <h2 className="pt-5">【未対応】{incompletedTasksNumbers}件</h2>
          <ul className=" pl-5">
            <li className="pt-2">
              {deadlineDay}までに対応必須の項目が{deadlineNumbers}件あります
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
