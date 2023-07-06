import { group } from "@/const/group";
import OrangeButton from "@/components/ui/button/OrangeButton";
import Link from "next/link";

const data = group;

const GroupTable = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <table>
          <thead>
            <tr>
              <th className="border px-4 py-2">グループ作成日</th>
              <th className="border px-4 py-2">グループ名</th>
              <th className="border px-4 py-2">人数</th>
            </tr>
          </thead>
          <tbody>
            {data.map((group) => (
              <tr key={group.id}>
                <td className="border px-4 py-2">{group.grouping_date}</td>
                <td className="border px-4 py-2">{group.group_name}</td>
                <td className="border px-4 py-2">
                  {group.group_member.length}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <Link href={"/admin/groups/register"}>
          <OrangeButton label="新規グループ作成" />
        </Link>
      </div>
    </>
  );
};

export default GroupTable;
