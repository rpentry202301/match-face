type User = {
  id: number,
  user_name: string,
  user_status: "研修中" | "待機中" | "アサイン中",
  entry_date: string,
  department: string,
}

export const userTable: User[] = [
  {
    id: 1,
    user_name: "田中太郎",
    user_status: "待機中",
    entry_date: "2023-07-01",
    department: "Java"
  },
  {
    id: 2,
    user_name: "鈴木二郎",
    user_status: "待機中",
    entry_date: "2023-07-01",
    department: "Java"
  },
  {
    id: 3,
    user_name: "伊藤三郎",
    user_status: "待機中",
    entry_date: "2023-07-01",
    department: "Java"
  },
]
