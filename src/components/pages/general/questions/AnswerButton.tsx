"use client";
import { ComponentProps } from "react";

type Props = {
  answered?: boolean;
} & ComponentProps<"button">;
const AnswerButton = ({ answered, ...props }: Props) => {
  // answered = falseの時はボタンの色をredにする
  const style = answered
    ? "text-black rounded w-auto px-2 h-6 text-lg text-xs bg-green"
    : "text-black rounded w-auto px-2 h-6 text-lg text-xs bg-red";
  const label = answered ? "確認する" : "回答する";
  //親要素でlabelを指定する
  return (
    <button {...props} className={style}>
      {label}
    </button>
  );
};

export default AnswerButton;
