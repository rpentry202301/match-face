"use client";
import { userTable } from "@/const/userTable";
import CheckBox from "@/components/ui/checkbox/CheckBox";
import { ChangeEvent } from "react";

type User = {
  id: number;
  name: string;
  hireDate: string;
  departmentId: number;
  department: {
    id: number;
    name: string;
  };
  statusId: number;
  status: {
    id: number;
    name: string;
  };
};

const UserList = ({
  users = [],
  checkedValues,
  onChange,
}: {
  users: User[];
  checkedValues: string[];
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  const tableDefaultClassName =
    "border-2 border-deep-gray px-4 py-2 text-center";
  return (
    <div className="my-10">
      <table className="w-10/12 border-collapse border-2 border-deep-gray text-sm mx-auto">
        <thead className="bg-light-gray">
          <tr>
            <th className={`${tableDefaultClassName} w-1/12`}></th>
            <th className={`${tableDefaultClassName} w-3/12`}>入社日</th>
            <th className={`${tableDefaultClassName} w-20`}>職種</th>
            <th className={`${tableDefaultClassName} w-28`}>状態</th>
            <th className={`${tableDefaultClassName} w-fit`}>氏名</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr key={`userId_${i}`}>
              <td className={`${tableDefaultClassName}`}>
                <CheckBox
                  id={user.id.toString()}
                  value={user.name}
                  onChange={onChange}
                  checked={checkedValues.includes(user.name)}
                />
              </td>
              <td className={`${tableDefaultClassName}`}>{user.hireDate}</td>
              <td className={`${tableDefaultClassName}`}>
                {user.department.name}
              </td>
              <td className={`${tableDefaultClassName}`}>{user.status.name}</td>
              <td className={`${tableDefaultClassName}`}>{user.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
