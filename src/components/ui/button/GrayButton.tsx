"use client";
import { ComponentProps } from "react";

type GrayBtnProps = {
  label: string;
} & ComponentProps<"button">;

const GrayButton = ({ label, ...props }: GrayBtnProps) => {
  // console.log(label);
  const style =
    " bg-neutral-300 drop-shadow-lg hover:brightness-95 active:drop-shadow-none active:shadow-inner active:mt-0.5 text-black rounded-xl w-40 h-8 text-lg";
  return (
    <div>
      <button className={style} {...props}>
        {label}
      </button>
    </div>
  );
};

export default GrayButton;
