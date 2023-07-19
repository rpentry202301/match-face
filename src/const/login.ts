type User = {
  id: number;
  name: string;
  password: string;
  email: string;
  hire_date: string;
  department_id: number;
  status_id: number;
  created_user: string;
  created_at: string;
  update_user: string;
  update_at: string;
};

type Users = User[];

const users: Users = [
  {
    id: 1111,
    name: 'ラクス太郎',
    password: 'Password&1',
    email: 'rakus@example.com',
    hire_date: '2023-01-01',
    department_id: 1,
    status_id: 1,
    created_user: 'ラクス責任者',
    created_at: '2022-12-30',
    update_user: 'ラクス責任者',
    update_at: '2023-01-02',
  },
  {
    id: 2222,
    name: 'ラクス次郎',
    password: 'Password&2',
    email: 'rakus2@example.com',
    hire_date: '2023-01-01',
    department_id: 2,
    status_id: 2,
    created_user: 'ラクス責任者',
    created_at: '2022-12-30',
    update_user: 'ラクス責任者',
    update_at: '2023-01-02',
  },
  {
    id: 3333,
    name: 'ラクス三郎',
    password: 'Password&3',
    email: 'rakus3@example.com',
    hire_date: '2023-01-01',
    department_id: 3,
    status_id: 3,
    created_user: 'ラクス責任者',
    created_at: '2022-12-30',
    update_user: 'ラクス責任者',
    update_at: '2023-01-02',
  },
];

export default users;
