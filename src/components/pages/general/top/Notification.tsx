import { twMerge } from 'tailwind-merge';

type MenuProps = {
  title: string;
  description: string;
  className: string | undefined;
};

export default function Notification({
  title,
  description,
  className,
}: MenuProps) {
  //buttonのclassNameは親コンポーネントでclassNameを指定して上書き可能
  const mergedClassName = twMerge(
    'flex p-5 w-96 h-40 shadow-lg flex-col',
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
