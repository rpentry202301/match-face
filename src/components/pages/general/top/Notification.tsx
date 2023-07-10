import { twMerge } from 'tailwind-merge';

type MenuProps = {
  title: string;
  // description: string;
  className: string;
};

export default function Notification({
  title,
  // description,
  className,
}: MenuProps) {
  //buttonのclassNameは親コンポーネントでclassNameを指定して上書き可能
  const mergedClassName = twMerge('p-5 w-1/2 h-[360px] shadow-lg', className);
  return (
    <>
      <div className={mergedClassName}>
        <h1 className="border-b-[2px] border-b-black shadow-md text-2xl text-left w-full font-bold h-12">
          {title}
        </h1>

        <div className="pt-4">
          {/* answer_statusがtrueの件数? */}
          <h2 className="">【対応済】15件</h2>
          {/* answer_statusがfalseの件数? */}
          <h2 className="pt-4">【未対応】30件</h2>
          {/* answer_deadline(6行まで) */}
          <ul className=" pl-4">
            <li className="pt-2">7月20日までに対応必須の項目が3件あります</li>
            <li className="pt-2">8月12日までに対応必須の項目が3件あります</li>
            <li className="pt-2">8月12日までに対応必須の項目が3件あります</li>
            <li className="pt-2">8月12日までに対応必須の項目が3件あります</li>
            <li className="pt-2">8月12日までに対応必須の項目が3件あります</li>
            <li className="pt-2">8月12日までに対応必須の項目が3件あります</li>
          </ul>
        </div>
      </div>
    </>
  );
}
