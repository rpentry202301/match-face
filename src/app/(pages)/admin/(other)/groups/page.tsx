import GroupTable from "@/components/pages/admin/groups/GroupTable";
import GroupTableFromDb from "@/components/pages/admin/groups/GroupTableFromDB";

const GroupsPage = () => {
  return (
    <>
      {/* constからDB取得データに切り替えるため<GroupTable />コメントアウト */}
      <GroupTableFromDb />
    </>
  );
};

export default GroupsPage;
