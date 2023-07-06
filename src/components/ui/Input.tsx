'use client';

import { twMerge } from 'tailwind-merge';

type Props = React.ComponentProps<'input'>;

const Input = (props: Props) => {
  const className = twMerge('border border-black', props.className);
  return (
    <div>
      <input {...props} className={className} />
    </div>
  );
};

export default Input;
