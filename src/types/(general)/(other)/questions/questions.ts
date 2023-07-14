export type Projects = {
  id: number;
  name: string;
  detail: string;
  enterprise_id: number;
  department_id: number;
  created_user: string;
  created_at: string;
  update_user: string;
  update_at: string;
}[];

export type AnswerRequests = {
  id: number;
  user_id: number[];
  administrator_id: number;
  project_id: number;
  request_at: string;
  deadline: string;
  created_user: string;
  created_at: string;
  update_user: string;
  update_at: string;
}[];
