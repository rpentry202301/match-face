"use client";
import { useEffect, useState } from "react";
// import { entry_data } from "@/const/userList";
import { UserData } from "@/types/admin/users/types";

const selectOptions = [
  { id: 1, option: "入社日昇順" },
  { id: 2, option: "入社日降順" },
];

const UserList = (props: { data: UserData }) => {
  const userData = props.data;
  const [sortedData, setSortedData] = useState<any[]>([]);
  const [sortOption, setSortOption] = useState("入社日昇順");

  // データを昇順もしくは降順に並べ替える
  const sortOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.currentTarget.value);
    if (e.currentTarget.value === "入社日昇順") {
      const newData = userData.sort(function (a, b) {
        return a.hireDate < b.hireDate ? -1 : 1;
      });
      setSortedData(newData);
      // console.log("昇順", newData);
    } else {
      const newData = userData.sort(function (a, b) {
        return b.hireDate < a.hireDate ? -1 : 1;
      });
      setSortedData(newData);
      // console.log("降順", newData);
    }
  };

  useEffect(() => {
    // console.log(sortOption);
    setSortOption(sortOption);
  }, [userData, sortOption]);

  return (
    <>
      <p></p>
      <div className="flex justify-center mb-10">
        <div className="flex flex-col justify-center w-max">
          <div className="flex justify-end">
            <div>
              <label htmlFor="sortOption">ソート：</label>
              <select
                name="sortOption"
                id="sortOption"
                className=" border border-deep-gary"
                onChange={sortOptionChange}
                defaultValue="入社日昇順"
                data-testid="selectedOption"
              >
                {selectOptions.map((option) => (
                  <option key={option.id} value={option.option}>
                    {option.option}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <table className=" w-[720px] my-1">
            <thead>
              <tr className="border bg-light-gray">
                <th className=" border py-3">入社日</th>
                <th className=" border">所属</th>
                <th className=" border">状態</th>
                <th className=" border">氏名</th>
              </tr>
            </thead>
            <tbody>
              {userData &&
                userData.map((data: any) => (
                  <tr className="border text-center" key={data.id}>
                    <td className=" border py-3" data-testid="hireDate">
                      {data.hireDate}
                    </td>
                    <td className=" border">{data.department.name}</td>
                    <td className=" border">{data.status.name}</td>
                    <td className=" border">{data.name}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UserList;
