import { NextResponse } from 'next/server';
import { FetchUserModalData } from '@/types/admin/tasks/register/types';
import { URLSearchParams } from 'url';

const fetcher = async (endPoint: string) => fetch(`${process.env.BE_URL}/${endPoint}`,
  {
    cache: 'no-cache',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }
)
  .then((res) => res.json())
  .catch((err) => console.log(err))

export const GET = async (req: Request) => {
  const query = new URLSearchParams(req.url.split('?')[1]);

  const fetchModalData = async (query: URLSearchParams) => {
    const departments = await fetcher('departments')
    const statuses = await fetcher('statuses')
    const userGroups = await fetcher('user_groups')
    const users = await fetcher(`users?${query}`)
  
    return {
      departments: departments.departmentList,
      statuses: statuses.statusList,
      userGroups: userGroups.groupList,
      users: users.userList,
    } as FetchUserModalData
  }

  const fetchData = await fetchModalData(query)
  
  return NextResponse.json(fetchData);
};
