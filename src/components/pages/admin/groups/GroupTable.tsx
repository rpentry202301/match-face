import { group } from "@/const/group";

const data = group;

const GroupTable = () => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>グループ作成日</th>
            <th>グループ名</th>
            <th>人数</th>
          </tr>
        </thead>
        <tbody>
          {data.map((group) => (
            <tr key={group.id}>
              <td>{group.grouping_date}</td>
              <td>{group.group_name}</td>
              <td>{group.group_member.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default GroupTable;
