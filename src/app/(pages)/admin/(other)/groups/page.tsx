import GroupTableFromDb from "@/components/pages/admin/groups/GroupTableFromDB";
import GroupTableServerSide from "@/components/pages/admin/groups/GroupTableServerside";

const GroupsPage = () => {
  return (
    <>
      <GroupTableFromDb />
      {/* サーバーサイドでデータ取得完了後、こちらを実装したい*/}
      <GroupTableServerSide/> 
    </>
  );
};

export default GroupsPage;
