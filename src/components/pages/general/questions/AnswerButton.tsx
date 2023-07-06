"use client";
import { ComponentProps } from "react";

type Props = {
  label: string;
  answered?: boolean;
} & ComponentProps<"button">;
const AnswerButton = ({ label, answered, ...props }: Props) => {
  // answered = falseの時はボタンの色をredにする
  const style = answered 
  ? "text-black rounded w-auto px-2 h-6 text-lg text-xs bg-green" 
  : "text-black rounded w-auto px-2 h-6 text-lg text-xs bg-red";
  console.log(answered);
  //親要素でlabelを指定する 
  return (
    <button {...props} className={style}>
      {label}
    </button>
  );
};

export default AnswerButton;
