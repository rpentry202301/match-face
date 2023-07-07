import { entry_data } from "@/const/entry_data";

const UserList = () => {
  return (
    <div>
      <table className="my-10">
        <thead>
          <tr className="border bg-deep-gray">
            <th className=" border">入社日</th>
            <th className=" border">所属</th>
            <th className=" border">状態</th>
            <th className=" border">氏名</th>
          </tr>
        </thead>
        {entry_data.map((data: any, index: number) => (
          <tbody key={index}>
            <tr className="border">
              <td className=" border">{data.entry_date}</td>
              <td className=" border">{data.department}</td>
              <td className=" border">{data.user_status}</td>
              <td className=" border">{data.user_name}</td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default UserList;
