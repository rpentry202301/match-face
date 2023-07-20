"use client";

import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

const SelectBox = ({ optionVal, ...props }: Props) => {
  const baseStyle = "border-2 border-light-gray cursor-pointer";
  const mergeStyle = twMerge(baseStyle, props.className);

  return (
    <select {...props} className={mergeStyle}>
      {optionVal ? (
        optionVal.map((val, index) => (
          <option key={index} value={val} data-testid={`${props.id}:${val}`}>
            {val}
          </option>
        ))
      ) : (
        <></>
      )}
    </select>
  );
};

type Props = {
  optionVal: any[];
} & ComponentProps<"select">;

export default SelectBox;
