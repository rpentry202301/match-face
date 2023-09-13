import { Users } from "@/hooks/store/context/UserSelectContext";

// Hooks
export type SelectReducerAction = {
  type: "select";
  payload: string[];
};

export type UsersReducerAction = { type: string; payload: Users[] };

export type TasksReducerAction = {
  type: "initState";
  payload: Task[];
};

// other
export type Task = {
  id: number;
  project_name: string;
  department: string;
  question: string[];
  users: string[];
  answer_deadline: string;
};

//modal
export type FetchUserModalData = {
  departments: {
    id: number;
    name: string;
  }[];
  statuses: {
    id: number;
    name: string;
  }[];
  userGroups: {
    id: number;
    name: string;
  }[];
  users: {
    id: number;
    name: string;
    hireDate: string;
    departmentId: number;
    department: {
      id: number;
      name: string;
    };
    statusId: number;
    status: {
      id: number;
      name: string;
    };
  }[];
};

export type FetchQuestionModalData = {
  departments: {
    id: number;
    name: string;
  }[];
  skills: {
    id: number;
    name: string;
  }[];
  questions: {
    id: number;
    projectId: number;
    projectName: string;
    context: string;
    updateAt: string;
  }[];
  projects: {
    id: number;
    name: string;
  }[];
};
