export type Projects = {
    id:number,
    name:string,
    detail: string;
    enterprise_id: number;
    department_id: number;
    created_user: string;
    created_at: string;
    update_user: string;
    update_at: string;
}[]

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
}[]

export type Skills = {
    id: number;
    skill: string;
    created_user: string;
    created_at: string;
    update_user: string;
    update_at: string;
}[]

export type Departments = {
    id: number;
    name: string;
    created_user: string;
    created_at: string;
    update_user: string;
    update_at: string;
}[]

 export type Answers = {
    id: number;
    context: string;
    question_id: number;
    answer_request_id: number;
    user_id: number;
    Model_answer_fl: boolean;
    created_user: string;
    created_at: string;
    update_user: string;
    update_at: string;
}[]

export type Users = {
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
}[]

export type ProjectUserAnswer = {
    id:number,
    answer_status: boolean,
    user_id:number
}[]

export type AnswerRequestQuestions = {
    id: number;
    question_id: number;
    answer_request_id: number;
    is_answered: boolean;
    created_user: string;
    created_at: string;
    update_user: string;
    update_at: string;
}[]
