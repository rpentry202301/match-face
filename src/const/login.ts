import { type } from 'os';

type User = {
  id: number;
  user_id: string;
  password: string;
};

type Users = User[];

const users: Users = [
  {
    id: 1,
    user_id: 'user1',
    password: 'password1',
  },
  {
    id: 2,
    user_id: 'user2',
    password: 'password2',
  },
];

export default users;
