"use client";
import Input from "@/components/ui/Input";
import WhiteButton from "@/components/ui/button/WhiteButton";
import { department, entry_data } from "@/const/userList";
import { entry_status } from "@/const/userList";
import { useState } from "react";
import UserList from "./UserList";
import OrangeButton from "@/components/ui/button/OrangeButton";

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
  const [isSelected, setIsSelected] = useState<{
    year: string;
    month: string;
    department: string;
    status: string;
  }>({
    year: "--",
    month: "--",
    department: "",
    status: "",
  });

  const [name, setName] = useState("");

  const [userData, setUserData] = useState<any[]>(entry_data);

  const [error, setError] = useState(false);

  const clickedStyle =
    "bg-gray-200 translate-y-0.5 shadow-sm px-4 rounded-full border ";

  const notClickedStyle =
    "bg-white hover:bg-gray-100 rounded-full border shadow-md ";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    console.log(name);
  };

  // 絞り込みボタンをクリック
  const handleSubmit = () => {
    const { year, month, department, status } = isSelected;
    // yearかmonthどちらかが選択されていない場合、エラーを表示
    if (
      (year !== "--" && month === "--") ||
      (year === "--" && month !== "--")
    ) {
      setError(true);
      // console.log(year, month);
      return;
    } else if (
      (year !== "--" && month !== "--") ||
      (year === "--" && month === "--")
    ) {
      setError(false);
      // console.log(year, month);
    }

    if (year !== "--" && month !== "--" && department !== "" && status !== "") {
      // 全項目選択済した場合
      const filterdData = entry_data.filter(
        (data) =>
          data.entry_date.slice(0, 4) === year &&
          data.entry_date.slice(5, 7) === month &&
          data.department === department &&
          data.user_status === status
      );
      console.log("完全一致", filterdData);
      setUserData(filterdData);
      return;
    }

    // 全て未選択の場合
    else if (
      year === "--" &&
      month === "--" &&
      department === "" &&
      status === ""
    ) {
      console.log("絞り込み条件なし", entry_data);
      setIsSelected({ ...isSelected, month: "--" });

      setUserData(entry_data);
      return;
    }

    // 部分選択
    else if (
      year !== "--" ||
      month !== "--" ||
      department !== "" ||
      status !== ""
    ) {
      // status以外選択した場合
      if (
        year !== "--" &&
        month !== "--" &&
        department !== "" &&
        status === ""
      ) {
        const filterdData = entry_data.filter(
          (data) =>
            data.entry_date.slice(0, 4) === year &&
            data.entry_date.slice(5, 7) === month &&
            data.department === department
        );
        console.log("status以外が一致", filterdData);
        setUserData(filterdData);
        return;
      }
      // department以外選択した場合
      else if (
        year !== "--" &&
        month !== "--" &&
        department === "" &&
        status !== ""
      ) {
        const filterdData = entry_data.filter(
          (data) =>
            data.entry_date.slice(0, 4) === year &&
            data.entry_date.slice(5, 7) === month &&
            data.user_status === status
        );
        console.log("department以外が一致", filterdData);
        setUserData(filterdData);
        return;
      }

      // yearとmonthを選択した場合
      else if (
        year !== "--" &&
        month !== "--" &&
        department === "" &&
        status === ""
      ) {
        const filterdData = entry_data.filter(
          (data) =>
            data.entry_date.slice(0, 4) === year &&
            data.entry_date.slice(5, 7) === month
        );
        console.log("yearとmonthが一致", filterdData);
        setUserData(filterdData);
        return;
      }

      // departmentとstatusを選択した場合
      else if (
        year === "--" &&
        month === "--" &&
        department !== "" &&
        status !== ""
      ) {
        const filterdData = entry_data.filter(
          (data) =>
            data.department === department && data.user_status === status
        );
        console.log("departmentとstatusが一致", filterdData);
        setUserData(filterdData);
        return;
      }
      // departmentのみ選択した場合
      else if (
        year === "--" &&
        month === "--" &&
        department !== "" &&
        status === ""
      ) {
        const filterdData = entry_data.filter(
          (data) => data.department === department
        );
        console.log("departmentが一致", filterdData);
        setUserData(filterdData);
        return;
      }

      // statusのみ選択した場合
      if (
        year === "--" &&
        month === "--" &&
        department === "" &&
        status !== ""
      ) {
        const filterdData = entry_data.filter(
          (data) => data.user_status === status
        );
        console.log("statusが一致", filterdData);
        setUserData(filterdData);
        return;
      }
    }
  };

  // monthの値を更新
  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMonth = e.currentTarget.value;
    if (selectedMonth === "--" || parseInt(selectedMonth) >= 10) {
      setIsSelected({ ...isSelected, month: e.currentTarget.value });
    } else {
      setIsSelected({ ...isSelected, month: `0${e.currentTarget.value}` });
    }
  };

  // departmentのON/OFF切り替え
  const handleDepartmentClick = (department: string) => {
    // console.log("確認用", department);
    if (isSelected.department === department) {
      setIsSelected({ ...isSelected, department: "" });
      return;
    } else {
      setIsSelected({ ...isSelected, department });
      return;
    }
  };

  // statusのON/OFF切り替え
  const handleStatusClick = (status: string) => {
    if (isSelected.status === status) {
      setIsSelected({ ...isSelected, status: "" });
    } else {
      setIsSelected({ ...isSelected, status });
    }
  };

  return (
    <>
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
              onChange={(e) => [
                setIsSelected({
                  ...isSelected,
                  year: e.currentTarget.value,
                }),
              ]}
              data-testid="year"
            >
              <option value="--">--</option>
              {yearArray.map((year: string) => (
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
              onChange={handleMonthChange}
              data-testid="month"
            >
              <option value="--">--</option>
              {monthArray.map((month) => (
                <option key={month} value={month}>
                  {month < 10 ? `0${month}` : month}
                </option>
              ))}
            </select>
            <label htmlFor="month">&nbsp;月入社</label>
            {error && (
              <div className=" text-red text-xs">
                ※年もしくは月を選択してください
              </div>
            )}
          </div>
          <div className=" flex my-5">
            {department.map((department, id) => (
              <div key={id}>
                {department.department !== isSelected.department ? (
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
                {status.status !== isSelected.status ? (
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
          <div className=" text-center mt-10 mb-5">
            <OrangeButton
              label="絞り込み"
              className="w-28 text-sm"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
      <UserList data={userData} />
    </>
  );
};
export default SearchUser;
