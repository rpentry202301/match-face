'use client';

import { type } from 'os';
import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

type InputProps = {
  id: string;
} & ComponentProps<'input'>;

const Input = ({ id, ...props }: InputProps) => {
  const className = twMerge('border border-black', props.className);
  return (
    <div>
      <input {...props} className={className} id={id} />
    </div>
  );
};

export default Input;
