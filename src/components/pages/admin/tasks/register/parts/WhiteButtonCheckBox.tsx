"use client";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

// checkboxでボタンを実装
const WhiteButtonCheckBox = ({ id, label, ...props }: W_BtnProps) => {
  const baseStyle = "text-xs inline-flex items-center justify-center py-2 px-4 bg-white hover:bg-gray-100 border rounded-full shadow-md cursor-pointer"
  const mergeStyle = twMerge(baseStyle + props.className);
  return (
    <div>
      <input {...props} type="checkbox" id={id} className={"peer sr-only"} />
      <label htmlFor={id} className={`${mergeStyle} peer-checked:shadow-sm peer-checked:bg-gray-200 peer-checked:translate-y-0.5`}>
        {label}
      </label>
    </div>
  );
};

type W_BtnProps = {
  id: string;
  label: string;
} & ComponentProps<"input">;

export default WhiteButtonCheckBox;
