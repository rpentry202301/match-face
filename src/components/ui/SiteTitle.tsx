import { twMerge } from 'tailwind-merge';

type Props = {
  className: string;
};

const SiteTitle = ({ className }: Props) => {
  const mergeStyle = twMerge('text-orange text-4xl font-semibold', className);
  return <h1 className={mergeStyle}>Match Face</h1>;
};

export default SiteTitle;
