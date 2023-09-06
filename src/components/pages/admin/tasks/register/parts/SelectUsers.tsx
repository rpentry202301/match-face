import UserSelectModal from "../UserSelectModal";
import UserInput from "./UserInput ";
import type { FetchUserModalData } from "@/types/admin/tasks/register/types";

const SelectUsers = async () => {
  // /apiがうまく動かなかったため、一旦ここでfetchしています
  // 処理的にはどちらもサーバー側でfetchしているので大丈夫だと思います
  const fetcher = async (endPoint: string) => fetch(`${process.env.BE_URL}/${endPoint}`,
  {
    cache: 'no-cache',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }
  ).then((res) => res.json())
  

  const fetchModalData = async () => {
    const departments = await fetcher('departments')
    const statuses = await fetcher('statuses')
    const userGroups = await fetcher('user_groups')
  
    return {
      departments: departments.departmentList,
      statuses: statuses.statusList,
      userGroups: userGroups.groupList,
    } as FetchUserModalData
  }

  const fetchData = await fetchModalData()

  console.log(fetchData)

  return (
    <div className="mb-5">
      <div className="flex items-center mb-2">
        <p className="text-base w-40">▶ユーザーを選択する</p>
        <div className="text-xs ml-10">
          <UserSelectModal fetchData={fetchData} />
        </div>
      </div>
      <div>
        {/* Todo: 別コンポーネントに<Input/>を渡す("use clent"使用のため) */}
        {/* <Input
          id="search"
          className="border-2 border-light-gray text-xs p-1 w-full"
          readOnly
        /> */}
        <UserInput />
      </div>
    </div>
  );
};

export default SelectUsers;
