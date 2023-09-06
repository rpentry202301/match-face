// Hooks
export type SelectReducerAction = {
  type: "select";
  payload: string[];
};

export type TasksReducerAction = {
  type: "initState";
  payload: Task[];
}

// other
export type Task = {
  id: number;
  project_name: string;
  department: string;
  question: string[];
  users: string[];
  answer_deadline: string;
};
