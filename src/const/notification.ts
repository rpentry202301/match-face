type AnswerRequest = {
  id: number;
  user_id: number;
  administorator_id: number;
  project_id: number;
  request_at: string;
  deadline: string;
  is_answered: boolean;
  created_user: string;
  created_at: string;
  update_user: string;
  update_at: string;
};

type AnswerRequests = AnswerRequest[];

export const answerRequests: AnswerRequests = [
  {
    id: 1,
    user_id: 1111,
    administorator_id: 1111,
    project_id: 1,
    request_at: '2023-07-25',
    deadline: '2023-08-06',
    is_answered: false,
    created_user: 'ラクス責任者',
    created_at: '2023-07-24',
    update_user: 'ラクス責任者',
    update_at: '2023-07-27',
  },
  {
    id: 2,
    user_id: 1111,
    administorator_id: 1111,
    project_id: 2,
    request_at: '2023-07-27',
    deadline: '2023-08-15',
    is_answered: false,
    created_user: 'ラクス責任者',
    created_at: '2023-07-24',
    update_user: 'ラクス責任者',
    update_at: '2023-07-27',
  },
  {
    id: 3,
    user_id: 2222,
    administorator_id: 3333,
    project_id: 3,
    request_at: '2023-08-24',
    deadline: '2023-09-15',
    is_answered: false,
    created_user: 'ラクス責任者',
    created_at: '2023-08-23',
    update_user: 'ラクス責任者',
    update_at: '2023-08-27',
  },
  {
    id: 4,
    user_id: 2222,
    administorator_id: 4444,
    project_id: 1,
    request_at: '2023-07-25',
    deadline: '2023-08-06',
    is_answered: false,
    created_user: 'ラクス責任者',
    created_at: '2023-07-24',
    update_user: 'ラクス責任者',
    update_at: '2023-07-27',
  },
  {
    id: 5,
    user_id: 1111,
    administorator_id: 1111,
    project_id: 4,
    request_at: '2023-09-20',
    deadline: '2023-10-15',
    is_answered: false,
    created_user: 'ラクス責任者',
    created_at: '2023-09-19',
    update_user: 'ラクス責任者',
    update_at: '2023-09-19',
  },
];
