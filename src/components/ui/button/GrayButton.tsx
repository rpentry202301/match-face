"use client";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type GrayBtnProps = {
  label: string;
} & ComponentProps<"button">;

const GrayButton = ({ label, ...props }: GrayBtnProps) => {
  // console.log(label);
  const style = twMerge(
    "bg-neutral-300 drop-shadow-lg hover:brightness-95 active:drop-shadow-none active:shadow-inner active:mt-0.5 text-black rounded-xl w-40 h-8 text-lg",
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
