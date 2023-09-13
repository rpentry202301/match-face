import GroupTableflame from "./GroupTableflame";
import { fetchData } from "./fetchData";

type Data = {
  createdAt:string,
  createdUser:string,
  description:string,
  id:number,
  memberCount:number,
  name:string ,
  updateAt:string,
  updateUser:string,
  userList:[],
}

const GroupsTable = async () => {
  const data = await fetchData();

  const checkData = () =>{
    if(data){
      console.log('いま確認したい',typeof data,data)
      console.log('createdAt',typeof data[0].createdAt)
    }
  }

  checkData()

  // 日付表記をtimestampからyyyy-mm-ddに変更
  if (Array.isArray(data)) {
    const formattedData = data.map((item:Data) => {
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
