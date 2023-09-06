"use client";
import Input from "@/components/ui/Input";
import WhiteButton from "@/components/ui/button/WhiteButton";
import WhiteCheckButton from "@/components/ui/button/WhiteCheckButton";
import { useState, useEffect } from "react";
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
    department: {};
    status: string;
  }>({
    year: "",
    month: "",
    department: initDep,
    status: "",
  });
  console.log({ ...isSelected });

  const [name, setName] = useState("");
  const [department, setDepartment] = useState<any[]>([]);
  const [status, setStatus] = useState<any[]>([]);
  // ↓絞り込み条件で表示するユーザーデータ
  const [userData, setUserData] = useState<any[]>([]);
  // ↓ユーザー一覧
  const [fetchData, setfetchData] = useState<any[]>([]);
  const [error, setError] = useState(false);
  const clickedStyle =
    "bg-gray-200 translate-y-0.5 shadow-sm px-4 rounded-full border ";

  const notClickedStyle =
    "bg-white hover:bg3000-gray-100 rounded-full border shadow-md ";

  useEffect(() => {
    // departmentの取得
    const fetchDepartments = async () => {
      const response = await fetch(
        "http://localhost:3000/api/admin/users/department"
      );
      const data = await response.json();
      setDepartment(data.departmentList);
      return department;
    };
    // statusの取得
    const fetchStatus = async () => {
      const response = await fetch(
        "http://localhost:3000/api/admin/users/status"
      );
      const data = await response.json();
      setStatus(data.statusList);
      return status;
    };
    // ユーザーデータの取得
    const fetchUserData = async () => {
      const response = await fetch(
        "http://localhost:3000/api/admin/users/userList"
      );
      const data = await response.json();
      const userList = data.userList.sort((a: any, b: any) =>
        a.hireDate < b.hireDate ? -1 : 1
      );
      setUserData(userList);
      setfetchData(userList);
      return userList;
    };
    fetchDepartments();
    fetchStatus();
    fetchUserData();
  }, []);

  const initDep = department.map((data) => {
    return {
      name: department.name,
      checked: false,
    };
  });
  console.log(initDep);

  const handleInputChange = () => {
    setIsSelected({
      ...isSelected,
      year: "--",
      month: "--",
      department: "",
      status: "",
    });
    const filteredData = fetchData.filter((data) => data.name.includes(name));
    console.log("検索結果：", filteredData);
    setUserData(filteredData);
  };

  // 絞り込みボタンをクリック
  const handleSubmit = () => {
    setName("");
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
      // 全項目選択した場合
      const filterdData = fetchData.filter(
        (data) =>
          data.hireDate.slice(0, 4) === year &&
          data.hireDate.slice(5, 7) === month &&
          data.department.name === department &&
          data.status.name === status
      );
      setUserData(filterdData);
      console.log("完全一致", filterdData);
      return;
    }

    // 全て未選択の場合
    else if (
      year === "--" &&
      month === "--" &&
      department === "" &&
      status === ""
    ) {
      setIsSelected({ ...isSelected, month: "--" });

      setUserData(fetchData);
      console.log("絞り込み条件なし", fetchData);
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
        const filterdData = fetchData.filter(
          (data) =>
            data.hireDate.slice(0, 4) === year &&
            data.hireDate.slice(5, 7) === month &&
            data.department.name === department
        );
        setUserData(filterdData);
        console.log("status以外が一致", filterdData);
        return;
      }
      // department以外選択した場合
      else if (
        year !== "--" &&
        month !== "--" &&
        department === "" &&
        status !== ""
      ) {
        const filterdData = fetchData.filter(
          (data) =>
            data.hireDate.slice(0, 4) === year &&
            data.hireDate.slice(5, 7) === month &&
            data.status.name === status
        );
        setUserData(filterdData);
        console.log("department以外が一致", filterdData);
        return;
      }

      // yearとmonthを選択した場合
      else if (
        year !== "--" &&
        month !== "--" &&
        department === "" &&
        status === ""
      ) {
        const filterdData = fetchData.filter(
          (data) =>
            data.hireDate.slice(0, 4) === year &&
            data.hireDate.slice(5, 7) === month
        );
        setUserData(filterdData);
        console.log("yearとmonthが一致", filterdData);
        return;
      }

      // departmentとstatusを選択した場合
      else if (
        year === "--" &&
        month === "--" &&
        department !== "" &&
        status !== ""
      ) {
        const filterdData = fetchData.filter(
          (data) =>
            data.department.name === department && data.status.name === status
        );
        setUserData(filterdData);
        console.log("departmentとstatusが一致", filterdData);
        return;
      }
      // departmentのみ選択した場合
      else if (
        year === "--" &&
        month === "--" &&
        department !== "" &&
        status === ""
      ) {
        const filterdData = fetchData.filter(
          (data) => data.department.name === department
        );
        setUserData(filterdData);
        console.log("departmentが一致", filterdData);
        return;
      }

      // statusのみ選択した場合
      if (
        year === "--" &&
        month === "--" &&
        department === "" &&
        status !== ""
      ) {
        const filterdData = fetchData.filter(
          (data) => data.status.name === status
        );
        setUserData(filterdData);
        console.log("statusが一致", filterdData);
        return;
      }
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
              onChange={(e) => setName(e.target.value)}
              data-testid="input"
            />
            <WhiteButton
              label="検索"
              className="w-20 py-0.5"
              onClick={handleInputChange}
              data-testid="searchButton"
            />
          </div>
          <div className=" w-4/5 mx-5">
            <select
              name="year"
              id="year"
              className="border"
              value={isSelected.year}
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
              value={isSelected.month}
              onChange={(e) => {
                setIsSelected({
                  ...isSelected,
                  month: e.currentTarget.value,
                });
              }}
              data-testid="month"
            >
              <option value="--">--</option>
              {monthArray.map((month) => (
                <option key={month} value={month >= 10 ? month : `0${month}`}>
                  {month >= 10 ? month : `0${month}`}
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
            {department.map((department) => (
              <div key={department.id}>
                {department.name !== isSelected.department ? (
                  <WhiteButton
                    label={department.name}
                    className={`w-20 mx-5 py-0.5 ${notClickedStyle}`}
                    value={department.name}
                    onClick={() => handleDepartmentClick(department.name)}
                    data-testid={`department_${department.id}`}
                  />
                ) : (
                  <WhiteButton
                    label={department.name}
                    className={`w-20 mx-5 py-0.5 ${clickedStyle}`}
                    value={department.name}
                    onClick={() => handleDepartmentClick(department.name)}
                  />
                )}
              </div>
            ))}
          </div>
          <div className=" flex my-5">
            {status.map((status) => (
              <div key={status.id}>
                {status.name !== isSelected.status ? (
                  <WhiteButton
                    label={status.name}
                    className={`w-32 mx-5 py-0.5 ${notClickedStyle}`}
                    value={status.name}
                    onClick={() => handleStatusClick(status.name)}
                    data-testid={`status_${status.id}`}
                  />
                ) : (
                  <WhiteButton
                    label={status.name}
                    className={`w-32 mx-5 py-0.5 ${clickedStyle}`}
                    value={status.name}
                    onClick={() => handleStatusClick(status.name)}
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
