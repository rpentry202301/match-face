type Data = {
  answer_status: boolean;
}[];

export const mockData = [
  {
    id: 1,
    deadline: "2023-12-01 18:00",
    project: {
      name: "バックエンド案件",
      detail: "販促アプリの新規開発、既存システムの保守・運用。",
    },
    answered: false,
  },
];
