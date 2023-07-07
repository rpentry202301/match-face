'use client'
import { userTable } from "@/const/userTable"

const UserList = () => {
  const tableDefaultClassName = "border-2 border-deep-gray px-4 py-2 text-center"
  return (
    <div className="my-10">
      <table className="border-collapse border-2 border-deep-gray text-sm mx-auto">
        <thead className="bg-light-gray">
          <tr>
            <th className={`${tableDefaultClassName} w-12`}></th>
            <th className={`${tableDefaultClassName}`}>入社日</th>
            <th className={`${tableDefaultClassName}`}>職種</th>
            <th className={`${tableDefaultClassName}`}>状態</th>
            <th className={`${tableDefaultClassName} w-40`}>氏名</th>
          </tr>
        </thead>
        <tbody>
          {userTable.map((user) => (
            <tr key={user.id}>
              <td className={`${tableDefaultClassName}`}></td>
              <td className={`${tableDefaultClassName}`}>{user.entry_date}</td>
              <td className={`${tableDefaultClassName}`}>{user.department}</td>
              <td className={`${tableDefaultClassName}`}>{user.user_status}</td>
              <td className={`${tableDefaultClassName}`}>{user.user_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
