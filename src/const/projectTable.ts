export type Question = {
  question_id: number;
  question: string;
  answer_example: string;
  answer: string;
  choices: string[];
  select : boolean
};

export type AnswerEditData = {
  id: number;
  project_name: string;
  project_detail: string;
  questions: Question[];
  edit_date: string;
  department: string;
};

export type Project = {
  id: number;
  name: string;
  detail: string;
  enterpriseId: number;
  departmentId: number;
  questionList: any[];
  createdUser: string;
  createdAt: string;
  updateUser: string;
  updateAt: string;
  deleted: boolean;
}

export type ProjectsResponse = {
  projectList: Project[];
}

export type Answer = {
  id: number;
  context: string;
  question_id: number;
  answer_request_id: number;
  user_id: number;
  model_answer_fl: boolean;
  is_deleted: boolean;
  created_user: string;
  created_at: Date;
  update_user: string;
  update_at: Date;
};

export type Choice = {
  id: number;
  questionId: number;
  context: string;
  createdUser: string;
  createdAt: string;
  updateUser: string;
  updateAt: string;
  deleted: boolean;
}

export type Questions = {
  id: number;
  projectId: number;
  context: string;
  choiceList: Choice[];
  answerList: Answer[];
  createdUser: string;
  createdAt: string;
  updateUser: string;
  updateAt: string;
  deleted: boolean;
}

export type ProjectDetail = {
  id: number;
  name: string;
  detail: string;
  enterpriseId: number;
  departmentId: number;
  questionList: Questions[];
  createdUser: string;
  createdAt: string;
  updateUser: string;
  updateAt: string;
  deleted: boolean;
}

export type ProjectResponse = {
  project: ProjectDetail;
};

export const initialProjectDetail: ProjectDetail = {
  id: 0,
  name: "",
  detail: "",
  enterpriseId: 0,
  departmentId: 0,
  questionList: [],
  createdUser: "",
  createdAt: "",
  updateUser: "",
  updateAt: "",
  deleted: false,
};


const ProjectTableData = [
  {
    id: 1,
    project_name: "test1",
    project_detail:
      "案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示",
    questions: [
      {
        question_id: 1,
        question:
          "問題文１問題文１問題文１問題文１問題文１問題文１問題文１問題文１問題文１問題文１問題文１",
        answer_example:
          "問題文１の回答例問題文１の回答例問題文１の回答例問題文１の回答例問題文１の回答例問題文１の回答例",
      },
      {
        question_id: 2,
        question:
          "問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２",
        answer_example:
          "問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例",
      },
      {
        question_id: 3,
        question:
          "問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３",
        answer_example:
          "問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例",
      },
    ],
    edit_date: "2023-7-6",
    department: "FR",
  },
  {
    id: 2,
    project_name: "test2",
    project_detail:
      "案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示",
    questions: [
      {
        question_id: 1,
        question:
          "問題文１問題文１問題文１問題文１問題文１問題文１問題文１問題文１問題文１問題文１問題文１",
        answer_example:
          "問題文１の回答例問題文１の回答例問題文１の回答例問題文１の回答例問題文１の回答例問題文１の回答例",
      },
      {
        question_id: 2,
        question:
          "問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２",
        answer_example:
          "問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例",
      },
      {
        question_id: 3,
        question:
          "問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３",
        answer_example:
          "問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例",
      },
    ],
    edit_date: "2023-7-6",
    department: "Java",
  },
  {
    id: 3,
    project_name: "test3",
    project_detail:
      "案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示",
    questions: [
      {
        question_id: 1,
        question:
          "問題文１問題文１問題文１問題文１問題文１問題文１問題文１問題文１問題文１問題文１問題文１",
        answer_example:
          "問題文１の回答例問題文１の回答例問題文１の回答例問題文１の回答例問題文１の回答例問題文１の回答例",
      },
      {
        question_id: 2,
        question:
          "問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２",
        answer_example:
          "問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例",
      },
      {
        question_id: 3,
        question:
          "問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３",
        answer_example:
          "問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例",
      },
    ],
    edit_date: "2023-7-6",
    department: "PHP",
  },
  {
    id: 4,
    project_name: "test4",
    project_detail:
      "案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示",
    questions: [
      {
        question_id: 1,
        question:
          "問題文１問題文１問題文１問題文１問題文１問題文１問題文１問題文１問題文１問題文１問題文１",
        answer_example:
          "問題文１の回答例問題文１の回答例問題文１の回答例問題文１の回答例問題文１の回答例問題文１の回答例",
      },
      {
        question_id: 2,
        question:
          "問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２",
        answer_example:
          "問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例",
      },
      {
        question_id: 3,
        question:
          "問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３",
        answer_example:
          "問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例",
      },
    ],
    edit_date: "2023-7-6",
    department: "PHP",
  },
  {
    id: 5,
    project_name: "test5",
    project_detail:
      "案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示",
    questions: [
      {
        question_id: 1,
        question:
          "問題文１問題文１問題文１問題文１問題文１問題文１問題文１問題文１問題文１問題文１問題文１",
        answer_example:
          "問題文１の回答例問題文１の回答例問題文１の回答例問題文１の回答例問題文１の回答例問題文１の回答例",
      },
      {
        question_id: 2,
        question:
          "問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２",
        answer_example:
          "問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例",
      },
      {
        question_id: 3,
        question:
          "問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３",
        answer_example:
          "問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例",
      },
    ],
    edit_date: "2023-7-6",
    department: "PHP",
  },
  {
    id: 6,
    project_name: "test6",
    project_detail:
      "案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示",
    questions: [
      {
        question_id: 1,
        question:
          "問題文１問題文１問題文１問題文１問題文１問題文１問題文１問題文１問題文１問題文１問題文１",
        answer_example:
          "問題文１の回答例問題文１の回答例問題文１の回答例問題文１の回答例問題文１の回答例問題文１の回答例",
      },
      {
        question_id: 2,
        question:
          "問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２",
        answer_example:
          "問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例",
      },
      {
        question_id: 3,
        question:
          "問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３",
        answer_example:
          "問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例",
      },
    ],
    edit_date: "2023-7-6",
    department: "PHP",
  },
  {
    id: 7,
    project_name: "test7",
    project_detail:
      "案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示",
    questions: [
      {
        question_id: 1,
        question:
          "問題文１問題文１問題文１問題文１問題文１問題文１問題文１問題文１問題文１問題文１問題文１",
        answer_example:
          "問題文１の回答例問題文１の回答例問題文１の回答例問題文１の回答例問題文１の回答例問題文１の回答例",
      },
      {
        question_id: 2,
        question:
          "問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２",
        answer_example:
          "問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例",
      },
      {
        question_id: 3,
        question:
          "問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３",
        answer_example:
          "問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例",
      },
    ],
    edit_date: "2023-7-6",
    department: "PHP",
  },
  {
    id: 8,
    project_name: "test8",
    project_detail:
      "案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示",
    questions: [
      {
        question:
          "問題文１問題文１問題文１問題文１問題文１問題文１問題文１問題文１問題文１問題文１問題文１",
        answer_example:
          "問題文１の回答例問題文１の回答例問題文１の回答例問題文１の回答例問題文１の回答例問題文１の回答例",
      },
      {
        question:
          "問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２",
        answer_example:
          "問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例",
      },
      {
        question:
          "問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３",
        answer_example:
          "問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例",
      },
    ],
    edit_date: "2023-7-6",
    department: "CL",
  },
  {
    id: 9,
    project_name: "test9",
    project_detail:
      "案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示",
    questions: [
      {
        question_id: 1,
        question:
          "問題文１問題文１問題文１問題文１問題文１問題文１問題文１問題文１問題文１問題文１問題文１",
        answer_example:
          "問題文１の回答例問題文１の回答例問題文１の回答例問題文１の回答例問題文１の回答例問題文１の回答例",
      },
      {
        question_id: 2,
        question:
          "問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２",
        answer_example:
          "問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例",
      },
      {
        question_id: 3,
        question:
          "問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３",
        answer_example:
          "問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例",
      },
    ],
    edit_date: "2023-7-6",
    department: "FR",
  },
  {
    id: 10,
    project_name: "test10",
    project_detail:
      "案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示",
    questions: [
      {
        question_id: 1,
        question:
          "問題文１問題文１問題文１問題文１問題文１問題文１問題文１問題文１問題文１問題文１問題文１",
        answer_example:
          "問題文１の回答例問題文１の回答例問題文１の回答例問題文１の回答例問題文１の回答例問題文１の回答例",
      },
      {
        question_id: 2,
        question:
          "問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２",
        answer_example:
          "問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例",
      },
      {
        question_id: 3,
        question:
          "問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３",
        answer_example:
          "問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例",
      },
    ],
    edit_date: "2023-7-6",
    department: "PHP",
  },
  {
    id: 11,
    project_name: "test11",
    project_detail:
      "案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示",
    questions: [
      {
        question:
          "問題文１問題文１問題文１問題文１問題文１問題文１問題文１問題文１問題文１問題文１問題文１",
        answer_example:
          "問題文１の回答例問題文１の回答例問題文１の回答例問題文１の回答例問題文１の回答例問題文１の回答例",
      },
      {
        question:
          "問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２",
        answer_example:
          "問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例",
      },
      {
        question:
          "問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３",
        answer_example:
          "問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例",
      },
    ],
    edit_date: "2023-7-6",
    department: "ML",
  },
  {
    id: 12,
    project_name: "test12",
    project_detail:
      "案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示",
    questions: [
      {
        question_id: 1,
        question:
          "問題文１問題文１問題文１問題文１問題文１問題文１問題文１問題文１問題文１問題文１問題文１",
        answer_example:
          "問題文１の回答例問題文１の回答例問題文１の回答例問題文１の回答例問題文１の回答例問題文１の回答例",
      },
      {
        question_id: 2,
        question:
          "問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２",
        answer_example:
          "問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例",
      },
      {
        question_id: 3,
        question:
          "問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３",
        answer_example:
          "問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例",
      },
    ],
    edit_date: "2023-7-6",
    department: "PHP",
  },
  {
    id: 13,
    project_name: "test13",
    project_detail:
      "案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示",
    questions: [
      {
        question_id: 1,
        question:
          "問題文１問題文１問題文１問題文１問題文１問題文１問題文１問題文１問題文１問題文１問題文１",
        answer_example:
          "問題文１の回答例問題文１の回答例問題文１の回答例問題文１の回答例問題文１の回答例問題文１の回答例",
      },
      {
        question_id: 2,
        question:
          "問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２",
        answer_example:
          "問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例",
      },
      {
        question_id: 3,
        question:
          "問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３",
        answer_example:
          "問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例",
      },
    ],
    edit_date: "2023-7-6",
    department: "QA",
  },
  {
    id: 14,
    project_name: "test14",
    project_detail:
      "案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示案件詳細が表示",
    questions: [
      {
        question_id: 1,
        question:
          "問題文１問題文１問題文１問題文１問題文１問題文１問題文１問題文１問題文１問題文１問題文１",
        answer_example:
          "問題文１の回答例問題文１の回答例問題文１の回答例問題文１の回答例問題文１の回答例問題文１の回答例",
      },
      {
        question_id: 2,
        question:
          "問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２問題文２",
        answer_example:
          "問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例問題文２の回答例",
      },
      {
        question_id: 3,
        question:
          "問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３",
        answer_example:
          "問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例問題文３の回答例",
      },
    ],
    edit_date: "2023-7-6",
    department: "PHP",
  },
];

export default ProjectTableData;
