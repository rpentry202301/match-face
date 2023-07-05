"use client";
import { ComponentProps } from "react";

type OrangeBtnProps = {
  label: string;
} & ComponentProps<"button">;

const OrangeButton = ({ label, ...props }: OrangeBtnProps) => {
  // console.log(label);
  const style =
    "bg-orange drop-shadow-lg hover:saturate-150 active:drop-shadow-none active:shadow-inner active:mt-0.5 text-white rounded-xl w-40 h-8 text-lg";
  return (
    <div>
      <button {...props} className={style}>
        {label}
      </button>
    </div>
  );
};

export default OrangeButton;
