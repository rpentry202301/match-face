"use client";
import Input from "@/components/ui/Input";
import WhiteButton from "@/components/ui/button/WhiteButton";
import { department } from "@/const/userList";
import { entry_status } from "@/const/userList";
import { useState } from "react";
import WhiteCheckButton from "@/components/ui/button/WhiteCheckButton";

const currentYear = new Date().getFullYear();
// console.log(currentYear);
const currentMonth = new Date().getMonth() + 1;
// console.log(currentMonth);

// 年の値をループ表示する
const yearArray: any[] = [];
const setYear = () => {
  for (let i = 2010; i <= currentYear; i++) {
    yearArray.push(i);
  }
  // console.log(yearArray);
  return yearArray;
};
setYear();

// 月の値をループ表示する
const monthArray: any[] = [];
const setMonth = () => {
  for (let i = 1; i <= 12; i++) {
    monthArray.push(i);
  }
  // console.log(monthArray);
  return monthArray;
};
setMonth();

const SearchUser = () => {
  const [clicked, setClicked] = useState(false);
  const [name, setName] = useState("");
  const [disabled, setDisabled] = useState(false);
  console.log(clicked);

  const baseStyle = clicked
    ? "bg-gray-200 translate-y-0.5 shadow-sm px-4 rounded-full border w-32 mr-5 py-0.5"
    : "bg-white hover:bg-gray-100 py-2 px-4 rounded-full border shadow-md w-32 mr-5 py-0.5";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <div className="flex justify-center">
      <div className="border border-deep-gray w-max my-10">
        <div className="flex items-center my-5">
          <Input
            id="1"
            className=" w-[516px] mx-5 border-deep-gray"
            value={name}
            onChange={handleInputChange}
          />
          <WhiteButton label="検索" className="w-20 py-0.5" />
        </div>
        <div className=" w-4/5 mx-5">
          <select
            name="year"
            id="year"
            className="border"
            defaultValue={currentYear}
          >
            {yearArray.map((year: number) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <label htmlFor="year">&nbsp;年&nbsp;</label>
          <select
            name="month"
            id="month"
            className="border"
            defaultValue={currentMonth}
          >
            {monthArray.map((month: number) => (
              <option key={month} value={month}>
                {month < 10 ? `0${month}` : month}
              </option>
            ))}
          </select>
          <label htmlFor="month">&nbsp;月</label>
        </div>
        <div className="my-5">
          {department.map((department, id) => (
            <WhiteCheckButton
              key={id}
              label={department.department}
              className="w-20 mx-5 py-0.5"
            />
          ))}
        </div>
        <div className="mx-5 my-5">
          {entry_status.map((status) => (
            <WhiteButton
              key={status.id}
              label={status.status}
              className={baseStyle}
              value={status.status}
              // disabled={disabled}
              // setStatus({...status, clicked: !clicked}),
              onClick={() => [setClicked(!clicked), setDisabled(!disabled)]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchUser;
