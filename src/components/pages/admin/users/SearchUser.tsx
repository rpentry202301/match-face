"use client";

import Input from "@/components/ui/Input";
import WhiteButton from "@/components/ui/button/WhiteButton";
import { department } from "@/const/userList";
import { entry_status } from "@/const/userList";

const currentYear = new Date().getFullYear();
// console.log(currentYear);

// 年の値をループ表示する
const setYear = () => {
  const year: any = [];
  for (let i = 2010; i <= currentYear; i++) {
    year.push(
      <option key={i} value={i} selected={i === currentYear}>
        {i}
      </option>
    );
  }
  return year;
};
// 月の値をループ表示する
const setMonth = () => {
  const month = [];
  for (let i = 1; i <= 12; i++) {
    month.push(
      <option key={i} value={i}>
        {i < 10 ? `0${i}` : i}
      </option>
    );
  }
  return month;
};

const SearchUser = () => {
  return (
    <div className="flex justify-center">
      <div className="border border-deep-gray w-max my-10">
        <div className="flex my-5">
          <Input id="1" className=" w-80 mx-5" />
          <WhiteButton label="検索" className="w-20 py-0.5" />
        </div>
        <div className="mx-5">
          <select name="year" id="year" className="border">
            {setYear()}
          </select>
          <label htmlFor="year"> 年</label>
          <select name="month" id="month" className="border">
            {setMonth()}
          </select>
          <label htmlFor="month"> 月</label>
        </div>

        <div className="my-5">
          {department.map((department, id) => (
            <WhiteButton
              key={id}
              label={department.department}
              className="w-20 mx-5 py-0.5"
            />
          ))}
        </div>
        <div className="mx-5 my-5">
          {entry_status.map((status, id) => (
            <WhiteButton
              key={id}
              label={status.status}
              className=" w-32 mr-5 py-0.5"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchUser;
