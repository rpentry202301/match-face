import OrangeButton from "@/components/ui/button/OrangeButton";
import Link from "next/link";
import { group } from "@/const/group"
import GroupTable from "@/components/pages/admin/groups/GroupTable";

const GroupsPage = () => {
  return (
    <>
      <div>グループ一覧画面</div>
      <br />
      <GroupTable/>
      <Link href={"/admin/groups/register"}>
        <br />
        <OrangeButton label="新規グループ作成" />
      </Link>
    </>
  );
};

export default GroupsPage;
