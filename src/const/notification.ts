type AnswerRequest = {
  id: number;
  user_id: number;
  administorator_id: number;
  project_id: number;
  request_at: string;
  deadline: string;
  answered: boolean;
  created_user: string;
  created_at: string;
  update_user: string;
  update_at: string;
};

type AnswerRequests = AnswerRequest[];

// answered === falseのデータ
export const falseAnswerRequests: AnswerRequests = [
  {
    id: 1,
    user_id: 1,
    administorator_id: 1,
    project_id: 1,
    request_at: '2023-09-11 12:14:38.347441',
    deadline: '2023-10-01 18:00:00',
    answered: false,
    created_user: 'ラクス責任者',
    created_at: '2023-09-11 12:14:38.347441',
    update_user: 'ラクス責任者',
    update_at: '2023-09-11 12:14:38.347441',
  },
  {
    id: 2,
    user_id: 1,
    administorator_id: 1,
    project_id: 2,
    request_at: '2023-09-11 12:14:38.347441',
    deadline: '2023-10-15 18:00:00',
    answered: false,
    created_user: 'ラクス責任者',
    created_at: '2023-09-11 12:14:38.347441',
    update_user: 'ラクス責任者',
    update_at: '2023-09-11 12:14:38.347441',
  },
  {
    id: 3,
    user_id: 1,
    administorator_id: 1,
    project_id: 3,
    request_at: '2023-09-11 12:14:38.347441',
    deadline: '2023-10-01 18:00:00',
    answered: false,
    created_user: 'ラクス責任者',
    created_at: '2023-09-11 12:14:38.347441',
    update_user: 'ラクス責任者',
    update_at: '2023-09-11 12:14:38.347441',
  },
  {
    id: 4,
    user_id: 1,
    administorator_id: 1,
    project_id: 4,
    request_at: '2023-09-11 12:14:38.347441',
    deadline: '2023-12-15 18:00:00',
    answered: false,
    created_user: 'ラクス責任者',
    created_at: '2023-09-11 12:14:38.347441',
    update_user: 'ラクス責任者',
    update_at: '2023-09-11 12:14:38.347441',
  },
];
// answered === trueのデータ
export const trueAnswerRequests: AnswerRequests = [
  {
    id: 5,
    user_id: 1,
    administorator_id: 1,
    project_id: 8,
    request_at: '2023-06-01 12:14:38.347441',
    deadline: '2023-06-30 18:00:00',
    answered: true,
    created_user: 'ラクス責任者',
    created_at: '2023-06-01 12:14:38.347441',
    update_user: 'ラクス責任者',
    update_at: '2023-06-01 12:14:38.347441',
  },
  {
    id: 6,
    user_id: 1,
    administorator_id: 1,
    project_id: 9,
    request_at: '2023-06-01 12:14:38.347441',
    deadline: '2023-06-30 18:00:00',
    answered: true,
    created_user: 'ラクス責任者',
    created_at: '2023-06-01 12:14:38.347441',
    update_user: 'ラクス責任者',
    update_at: '2023-06-01 12:14:38.347441',
  },
  {
    id: 7,
    user_id: 1,
    administorator_id: 1,
    project_id: 10,
    request_at: '2023-06-01 12:14:38.347441',
    deadline: '2023-08-01 18:00:00',
    answered: true,
    created_user: 'ラクス責任者',
    created_at: '2023-06-01 12:14:38.347441',
    update_user: 'ラクス責任者',
    update_at: '2023-06-01 12:14:38.347441',
  },
];
