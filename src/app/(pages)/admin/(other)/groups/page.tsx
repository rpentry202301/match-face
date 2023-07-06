import OrangeButton from "@/components/ui/button/OrangeButton";
import Link from "next/link";
import GroupTable from "@/components/pages/admin/groups/GroupTable";

const GroupsPage = () => {
  return (
    <>
      <GroupTable/>
      <br />
      <Link href={"/admin/groups/register"}>
        <OrangeButton label="新規グループ作成" />
      </Link>
    </>
  );
};

export default GroupsPage;
