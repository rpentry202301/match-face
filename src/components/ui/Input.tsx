'use client';

type Props = React.ComponentProps<'input'>

const Input = (props:Props) => {
  return (
    <div>
      <input
        {...props}
        className={'border border-black'}
      />
    </div>
  );
}

export default Input
