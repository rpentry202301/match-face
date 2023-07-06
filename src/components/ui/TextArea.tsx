import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  cols: number;
  rows: number;
} & ComponentProps<"textarea">;

const TextArea = ({ cols, rows, ...props }: Props) => {
  const mergeStyle = twMerge("border border-black w-full", props.className);
  return <textarea cols={cols} rows={rows} className={mergeStyle}></textarea>;
};

export default TextArea;
