import GroupTableflame from "./GroupTableflame";
import { fetchData } from "@/lib/common/fetch/fetchData";
import type { Groups } from "@/types/admin/groups/groups";



const GroupsTable = async () => {
  const rowData = await fetchData('groups');
  const data = rowData.groupList

  // 日付表記をtimestampからyyyy-mm-ddに変更
  if (Array.isArray(data)) {
    const formattedData = data.map((item:Groups) => {
      const createdAtDate = new Date(item.createdAt);
      const formattedCreatedAt = createdAtDate.toISOString().split("T")[0];

      let formattedUpdatedAt = "9999-12-31";
      if (item.updateAt !== "-999999999-01-01T00:00:00") {
        const updateAtDate = new Date(item.updateAt);
        formattedUpdatedAt = updateAtDate.toISOString().split("T")[0];
      } else {
      }

      return {
        ...item,
        createdAt: formattedCreatedAt,
        updateAt: formattedUpdatedAt,
      };
    });

    return <GroupTableflame data={formattedData} />;
  } else {
    console.error("jsonデータが配列でない");
    console.log(data)
  }
};

export default GroupsTable;
