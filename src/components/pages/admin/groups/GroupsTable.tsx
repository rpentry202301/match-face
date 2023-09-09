import GroupTableflame from "./GroupTableflame";


const GroupsTable = async () => {
  const url = process.env["BE_URL"];

  const response = await fetch(`${url}/groups`, { cache: "no-cache" });
  const rowData = await response.json();
  const data = rowData.groupList;

  // 日付表記をtimestampからyyyy-mm-ddに変更
  if (Array.isArray(data)) {
    const formattedData = data.map((item: any) => {
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
  }
};

export default GroupsTable;
