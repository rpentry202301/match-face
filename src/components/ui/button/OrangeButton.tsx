"use client";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type OrangeBtnProps = {
  label: string;
} & ComponentProps<"button">;

const OrangeButton = ({ label, ...props }: OrangeBtnProps) => {
  // console.log(label);
  const style = twMerge(
    "bg-orange drop-shadow-lg hover:saturate-150 active:drop-shadow-none active:shadow-inner hover:bg-depp-orange active:bg-depp-orange text-white rounded-xl p-2 w-50 h-auto text-lg",
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

export default OrangeButton;
