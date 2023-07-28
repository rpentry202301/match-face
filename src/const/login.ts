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

type Admin = {
  id: number;
  name: string;
  password: string;
  email: string;
  created_user: string;
  created_at: string;
  update_user: string;
  update_at: string;
};

export type Users = User[];
type Admins = Admin[];

export const users: Users = [
  {
    id: 1111,
    name: 'ラクス太郎',
    password: 'password#1',
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
    password: 'password#2',
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
    password: 'password#3',
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

export const dummyUser: Users = [
  {
    id: 999999,
    name: 'incorrect',
    password: 'incorrectPass#1',
    email: 'incorrect@example.com',
    hire_date: '9999-99-99',
    department_id: 999999,
    status_id: 999999,
    created_user: 'incorrectUser',
    created_at: '9999-99-99',
    update_user: 'incorrectUser',
    update_at: '9999-99-99',
  },
];

export const admin: Admins = [
  {
    id: 1111,
    name: 'ラクス責任太郎',
    password: 'adpassword#1',
    email: 'admin1@example.com',
    created_user: 'ラクス大王',
    created_at: '2022-12-30',
    update_user: 'ラクス大王',
    update_at: '2023-01-02',
  },
  {
    id: 2222,
    name: 'ラクス責任次郎',
    password: 'adpassword#2',
    email: 'admin2@example.com',
    created_user: 'ラクス大王',
    created_at: '2022-12-30',
    update_user: 'ラクス大王',
    update_at: '2023-01-02',
  },
  {
    id: 3333,
    name: 'ラクス責任三郎',
    password: 'adpassword#3',
    email: 'admin3@example.com',
    created_user: 'ラクス大王',
    created_at: '2022-12-30',
    update_user: 'ラクス大王',
    update_at: '2023-01-02',
  },
];

export const dummyAdmin: Admins = [
  {
    id: 999999,
    name: 'incorrect',
    password: 'incorrectPass#1',
    email: 'incorrect@example.com',
    created_user: 'incorrectUser',
    created_at: '9999-99-99',
    update_user: 'incorrectUser',
    update_at: '9999-99-99',
  },
];
