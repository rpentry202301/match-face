import GroupTableFromDb from "@/components/pages/admin/groups/GroupTableFromDB";
import GroupsTable from "@/components/pages/admin/groups/GroupsTable";

const GroupsPage = () => {
  return (
    <>
      {/* <GroupTableFromDb /> */}
      {/* サーバーサイドでデータ取得完了後、こちらを実装したい*/}
      <GroupsTable/>
    </>
  );
};

export default GroupsPage;
