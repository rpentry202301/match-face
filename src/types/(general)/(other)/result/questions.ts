export type QuestionList = {
  answerList: AnswerList[];
  choiceList: [];
  context: string;
  createdAt: string;
  createdUser?: string;
  deleted: boolean;
  id: number;
  projectId: number;
  updateAt: string;
  updateUser?: string;
}[];

export type ChoiceList = {};

export type AnswerList = {
  answerRequestId: number;
  context: string;
  createdAt: string;
  createdUser?: string;
  deleted: boolean;
  id: number;
  modelAnswerFl: boolean;
  questionId: number;
  updateAt: string;
  updateUser: string;
  userId: number;
};

export type Comment = {
  administratorId: number;
  answerRequestId: number;
  commentAdministrator: string;
  context: string;
  createdAt: string;
  createdUser?: string;
  id: number;
  updateAt: string;
  updateUser?: string;
  viewedAt?: [];
};
