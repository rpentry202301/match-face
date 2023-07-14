"use client";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

const WhiteButton = ({ label, error = false, ...props }: W_BtnProps) => {
  // error=trueの場合、font & border を赤に
  const baseStyle = error
    ? "bg-white hover:bg-gray-100 py-2 px-4 rounded-full border shadow-md border-red-600 text-red-600"
    : "bg-white hover:bg-gray-100 active:bg-gray-200 active:translate-y-0.5 active:shadow-sm py-2 px-4 rounded-full border shadow-md";
  const mergeStyle = twMerge(baseStyle, props.className);
  return (
    <button {...props} className={mergeStyle}>
      {label}
    </button>
  );
};

type W_BtnProps = {
  label: string;
  error?: boolean;
} & ComponentProps<"button">;

export default WhiteButton;
