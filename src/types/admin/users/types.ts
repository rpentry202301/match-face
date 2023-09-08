export type UserData = {
  id: number;
  name: string;
  password: string;
  email: string;
  hireDate: string;
  departmentId: number;
  department: {
    id: number;
    name: string;
    createdUser: string;
    createdAt: string;
    updateUser: string;
    updateAt: string;
  };
  statusId: number;
  status: {
    id: number;
    name: string;
    createdUser: string;
    createdAt: string;
    updateUser: string;
    updateAt: string;
  };
  createdUser: string;
  createdAt: string;
  updateUser: string;
  updateAt: string;
}[];
