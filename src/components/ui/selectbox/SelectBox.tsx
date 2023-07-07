"use client";

import { ComponentProps } from "react";

const SelectBox = ({ value, ...props }: Props) => {
  const style =
  "border-2 border-light-gray" +
    " " +
    props.className;

  return (
    <select {...props} className={style}>
      {value ? (
        value.map((val, index) => (
          <option key={index} value={val}>
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
  value: any[];
} & ComponentProps<"select">;

export default SelectBox;
