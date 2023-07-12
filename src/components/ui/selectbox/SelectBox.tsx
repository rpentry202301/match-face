"use client";

import { ComponentProps } from "react";

const SelectBox = ({ optionVal, ...props }: Props) => {
  const style = "border-2 border-light-gray" + " " + props.className;

  return (
    <select {...props} className={style}>
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
