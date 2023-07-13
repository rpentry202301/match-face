"use client";
import { ComponentProps } from "react";

type Props = {
  answered?: boolean;
} & ComponentProps<"button">;
const AnswerButton = ({ answered, ...props }: Props) => {
  // answered = falseの時はボタンの色をredにする
  const style = answered
    ? "text-black rounded w-auto px-2 h-6 text-xs bg-green hover:brightness-90"
    : "text-black rounded w-auto px-2 h-6 text-xs bg-red hover:brightness-90";
  const label = answered ? "確認する" : "回答する";
  //親要素でlabelを指定する
  return (
    <button {...props} className={style}>
      {label}
    </button>
  );
};

export default AnswerButton;
