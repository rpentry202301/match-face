"use client";
import { ComponentProps, useState } from "react";
import { twMerge } from "tailwind-merge";

const WhiteCheckButton = ({ label, ...props }: W_BtnProps) => {
    const [clicked, setClicked] = useState<boolean>(false)
  // error=trueの場合、font & border を赤に
  const baseStyle = clicked
    ? "bg-gray-200 translate-y-0.5 shadow-sm py-2 px-4 rounded-full border "
    : "bg-white hover:bg-gray-100 py-2 px-4 rounded-full border shadow-md ";
  const mergeStyle = twMerge(baseStyle + props.className);
  return (
    <button {...props} className={mergeStyle} onClick={() => setClicked(!clicked)}>
      {label}
    </button>
  );
};

type W_BtnProps = {
  label: string;
} & ComponentProps<"button">;

export default WhiteCheckButton;
