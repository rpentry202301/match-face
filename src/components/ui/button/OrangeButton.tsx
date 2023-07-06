'use client';
import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

type OrangeBtnProps = {
  label: string;
} & ComponentProps<'button'>;

const OrangeButton = ({ label, ...props }: OrangeBtnProps) => {
  // console.log(label);
  const style = twMerge(
    'bg-orange drop-shadow-lg hover:saturate-150 active:drop-shadow-none active:shadow-inner active:mt-0.5 text-white rounded-xl w-40 h-8 text-lg',
    props.className
  );
  return (
    <div>
      <button {...props} className={style}>
        {label}
      </button>
    </div>
  );
};

export default OrangeButton;
