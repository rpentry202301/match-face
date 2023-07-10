"use client";
import { useState } from "react";
import { entry_data } from "@/const/userList";

const UserList = () => {
  const [sortedData, setSortedData] = useState(entry_data);

  // データを昇順もしくは降順に並べ替える
  const sortOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortOption = event.target.value;
    if (sortOption === "入社日昇順") {
      const sortedData = [...entry_data].sort(function (a, b) {
        return a.entry_date < b.entry_date ? -1 : 1;
      });
      // console.log(sortedData);
      setSortedData(sortedData);
    } else {
      const sortedData = [...entry_data].sort(function (a, b) {
        return b.entry_date < a.entry_date ? -1 : 1;
      });
      // console.log(sortedData);
      setSortedData(sortedData);
    }
    return setSortedData;
  };

  return (
    <div className="flex justify-center mb-10">
      <div className="flex flex-col justify-center w-max">
        <div className="flex justify-end">
          <div>
            <label htmlFor="sortData">ソート：</label>
            <select
              name="userList"
              id="userList"
              className=" border border-deep-gary"
              onChange={sortOptionChange}
              defaultValue="入社日昇順"
            >
              <option value="入社日昇順">入社日昇順</option>
              <option value="入社日降順">入社日降順</option>
            </select>
          </div>
        </div>
        <table className=" w-[720px] my-1">
          <thead>
            <tr className="border bg-deep-gray">
              <th className=" border py-3">入社日</th>
              <th className=" border">所属</th>
              <th className=" border">状態</th>
              <th className=" border">氏名</th>
            </tr>
          </thead>
          {sortedData.map((data: any, index: number) => (
            <tbody key={index}>
              <tr className="border text-center">
                <td className=" border py-3">{data.entry_date}</td>
                <td className=" border">{data.department}</td>
                <td className=" border">{data.user_status}</td>
                <td className=" border">{data.user_name}</td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default UserList;
