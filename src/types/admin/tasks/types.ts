// タスク一覧
export interface TasksType {
  id: number;
  project: Tasks_Project;
  department: Tasks_Department;
  answerUserList: Tasks_AnswerUserList[];
  questionCount: number;
  deadline: Date;
  createdUser: string;
  createdAt: Date;
  updateUser: string;
  updateAt: string;
}
export interface Answer_RequestsType {
  answerRequests: TasksType[];
}

// tasks[].project
interface Tasks_Project {
  id: number;
  name: string;
  detail: string;
  enterpriseId: number;
  departmentId: number;
  questionList: [];
  createdUser: string;
  createdAt: string;
  updateUser: string;
  updateAt: string;
  deleted: boolean;
}

// tasks[].department
interface Tasks_Department {
  id: number;
  name: string;
  createdUser: string;
  createdAt: string;
  updateUser: string;
  updateAt: string;
}

// tasks[].answerUserList
interface Tasks_AnswerUserList {
  answerRequestId: number;
  userId: number;
  userName: string;
  answered: boolean;
}
