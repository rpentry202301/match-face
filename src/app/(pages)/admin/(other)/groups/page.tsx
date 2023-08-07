import GroupTable from "@/components/pages/admin/groups/GroupTable";
import GroupTableFromDb from "@/components/pages/admin/groups/GroupTableFromDB";

const GroupsPage = () => {
  return (
    <>
      <GroupTable />
      <GroupTableFromDb />
    </>
  );
};

export default GroupsPage;
