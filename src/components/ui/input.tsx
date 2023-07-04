'use client';

type Props = React.ComponentProps<'input'>

const Input = (props:Props) => {
  return (
    <div>
      <input
        {...props}
      />
    </div>
  );
}

export default Input
