import Image from 'next/image';
import Link from 'next/link';
import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

type MenuProps = {
  url: string;
  title: string;
  description: string;
  imgUrl: string;
  imgAlt: string;
} & ComponentProps<'button'>;

export default function Menu({
  url,
  title,
  description,
  imgUrl,
  imgAlt,
  ...props
}: MenuProps) {
  //buttonのclassNameは親コンポーネントでclassNameを指定して上書き可能
  const className = twMerge(
    'flex p-5 w-96 h-40 shadow-lg hover:bg-gray-100 flex-col active:bg-gray-200',
    props.className
  );
  // console.log('className', props);
  return (
    <Link href={url}>
      <button {...props} className={className}>
        <span className="border-b-[1px] border-b-black shadow-md text-2xl text-left w-full font-bold">
          {title}
        </span>

        <div className="flex pt-4 w-full">
          <span className="text-left mr-auto">{description}</span>
          <Image
            src={imgUrl}
            alt={imgAlt}
            width="70"
            height="70"
            className="pt-2 pl-2"
          />
        </div>
      </button>
    </Link>
  );
}
