"use client";
import Input from "@/components/ui/Input";
import WhiteButton from "@/components/ui/button/WhiteButton";
import { department } from "@/const/userList";
import { entry_status } from "@/const/userList";
import { useState } from "react";

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
  const [name, setName] = useState("");
  const [isSelected, setIsSelected] = useState({
    year: currentYear,
    month: currentMonth,
  });
  // console.log(isSelected)
  const [isClicked, setIsClicked] = useState({
    department: "",
    status: "",
  });

  // console.log(isClicked);
  // console.log(isSelected);

  const clickedStyle =
    "bg-gray-200 translate-y-0.5 shadow-sm px-4 rounded-full border ";

  const notClickedStyle =
    "bg-white hover:bg-gray-100 rounded-full border shadow-md ";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDepartmentClick = (department: string) => {
    if (isClicked.department === department) {
      setIsClicked({ ...isClicked, department: "" });
    } else {
      setIsClicked({ ...isClicked, department });
    }
  };
  const handleStatusClick = (status: string) => {
    if (isClicked.status === status) {
      setIsClicked({ ...isClicked, status: "" });
    } else {
      setIsClicked({ ...isClicked, status });
    }
  };

  return (
    <div className="flex justify-center">
      <div className="border border-deep-gray w-max my-10">
        <div className="flex items-center my-5">
          <Input
            id="1"
            className=" w-[530px] mx-5 border-deep-gray"
            value={name}
            onChange={handleInputChange}
            data-testid="input"
          />
          <WhiteButton
            label="検索"
            className="w-20 py-0.5"
            data-testid="searchButton"
          />
        </div>
        <div className=" w-4/5 mx-5">
          <select
            name="year"
            id="year"
            className="border"
            defaultValue="--"
            onChange={(e) =>
              setIsSelected({
                ...isSelected,
                year: Number(e.currentTarget.value),
              })
            }
            data-testid="year"
          >
            <option value="--">--</option>
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
            defaultValue="--"
            onChange={(e) =>
              setIsSelected({
                ...isSelected,
                month: Number(e.currentTarget.value),
              })
            }
            data-testid="month"
          >
            <option value="--">--</option>
            {monthArray.map((month: number) => (
              <option key={month} value={month}>
                {month < 10 ? `0${month}` : month}
              </option>
            ))}
          </select>
          <label htmlFor="month">&nbsp;月入社</label>
        </div>
        <div className=" flex my-5">
          {department.map((department, id) => (
            <div key={id}>
              {department.department !== isClicked.department ? (
                <WhiteButton
                  label={department.department}
                  className={`w-20 mx-5 py-0.5 ${notClickedStyle}`}
                  value={department.department}
                  onClick={() => handleDepartmentClick(department.department)}
                  data-testid={`department_${department.id}`}
                />
              ) : (
                <WhiteButton
                  label={department.department}
                  className={`w-20 mx-5 py-0.5 ${clickedStyle}`}
                  value={department.department}
                  onClick={() => handleDepartmentClick(department.department)}
                />
              )}
            </div>
          ))}
        </div>
        <div className=" flex my-5">
          {entry_status.map((status) => (
            <div key={status.id}>
              {status.status !== isClicked.status ? (
                <WhiteButton
                  label={status.status}
                  className={`w-32 mx-5 py-0.5 ${notClickedStyle}`}
                  value={status.status}
                  onClick={() => handleStatusClick(status.status)}
                  data-testid={`status_${status.id}`}
                />
              ) : (
                <WhiteButton
                  label={status.status}
                  className={`w-32 mx-5 py-0.5 ${clickedStyle}`}
                  value={status.status}
                  onClick={() => handleStatusClick(status.status)}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchUser;
