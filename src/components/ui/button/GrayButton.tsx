"use client";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type GrayBtnProps = {
  label: string;
} & ComponentProps<"button">;

const GrayButton = ({ label, ...props }: GrayBtnProps) => {
  // console.log(label);
  const style = twMerge(
    "bg-neutral-300 drop-shadow-lg hover:brightness-95 active:drop-shadow-none active:shadow-inner active:mt-0.5 text-black rounded-xl p-2 w-40 h-auto text-lg",
    props.className
  );
  return (
    <div>
      <button {...props} className={style}>
        {label}
      </button>
    </div>
  );
};

export default GrayButton;
