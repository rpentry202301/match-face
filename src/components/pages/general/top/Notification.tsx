import { twMerge } from 'tailwind-merge';

type MenuProps = {
  title: string;
  description: string;
  className: string;
};

export default function Notification({
  title,
  description,
  className,
}: MenuProps) {
  //buttonのclassNameは親コンポーネントでclassNameを指定して上書き可能
  const mergedClassName = twMerge(
    'flex p-5 w-1/2 h-96 shadow-lg flex-col',
    className
  );
  return (
    <div className={mergedClassName}>
      <span className="border-b-[1px] border-b-black shadow-md text-2xl text-left w-full font-bold">
        {title}
      </span>

      <div className="flex pt-4 w-full">
        <span className="text-left mr-auto">{description}</span>
      </div>
    </div>
  );
}
