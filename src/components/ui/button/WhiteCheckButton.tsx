"use client";
import { ComponentProps, useState, MouseEvent } from "react";
import { twMerge } from "tailwind-merge";

const WhiteCheckButton = ({ label, ...props }: W_BtnProps) => {
  const [clicked, setClicked] = useState<boolean>(false);
  // clickedの値で表示を切り替え
  const baseStyle = clicked
    ? "bg-gray-200 translate-y-0.5 shadow-sm py-2 px-4 rounded-full border"
    : "bg-white hover:bg-gray-100 py-2 px-4 rounded-full border shadow-md";
  const mergeStyle = twMerge(baseStyle, props.className);
  return (
    <button
      {...props}
      className={mergeStyle}
      onClick={(event: MouseEvent<HTMLButtonElement>) => {
        setClicked(!clicked);
        props.onClick ? props.onClick(event) : undefined;
      }}
    >
      {label}
    </button>
  );
};

type W_BtnProps = {
  label: string;
} & ComponentProps<"button">;

export default WhiteCheckButton;
