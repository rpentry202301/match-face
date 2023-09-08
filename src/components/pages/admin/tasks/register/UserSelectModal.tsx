import UserSelectModalForm from "./parts/UserSelectModalForm";
import { FetchUserModalData } from "@/types/admin/tasks/register/types";

const UserSelectModal = async () => {
  const fetcher = async (endPoint: string) => {
    const response = await fetch(
      `${process.env.BE_URL}/${endPoint}`,
      {
        cache: 'no-cache',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    const data = await response.json()
    return data
  }
      

  const fetchModalData = async () => {
    const departments = await fetcher('departments')
    const statuses = await fetcher('statuses')
    const userGroups = await fetcher('user_groups')
    const users = await fetcher('users')
  
    return {
      departments: departments.departmentList,
      statuses: statuses.statusList,
      userGroups: userGroups.groupList,
      users: users.userList,
    } as FetchUserModalData
  }

  const fetchData = await fetchModalData()
  console.log(fetchData)

  return (
    <div>
      <UserSelectModalForm fetchData={fetchData} />
    </div>
  );
}

export default UserSelectModal;
