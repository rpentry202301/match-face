"use client";
import { ComponentProps } from "react";

// textSizeを指定することでbutton自体のサイズも調節可能
const WhiteButton = ({ label, textSize, error, ...props }: W_BtnProps) => {
  const style = error
    ? // error=trueの場合、font & border を赤に
      "bg-white hover:bg-gray-100 py-2 px-4 rounded-full border shadow-md border-red-600 text-red-600 "
    : "bg-white hover:bg-gray-100 py-2 px-4 rounded-full border shadow-md " +
      textSize;
  return (
    <button {...props} className={style}>
      {label}
    </button>
  );
};

type W_BtnProps = {
  label: string;
  textSize?: string;
  error?: boolean;
} & ComponentProps<"button">;

export default WhiteButton;
