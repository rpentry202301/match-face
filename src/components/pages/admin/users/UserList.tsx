"use client";
import SortUserList from "@/components/pages/admin/users/SortUserList";
import { entry_data } from "@/const/userList";

const UserList = () => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col justify-center w-max">
        <div className="flex justify-end">
          <SortUserList />
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
          {entry_data.map((data: any, index: number) => (
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
