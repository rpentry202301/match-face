export const group = [
  {
    id: 1,
    grouping_date: "2023/7/1",
    group_name: "2023年7月入社",
    group_member: [
      { user_id: "1", user_name: "テスト太郎" },
      { user_id: "2", user_name: "テスト二郎" },
      { user_id: "3", user_name: "テスト三郎" },
    ],
    grouping_description: "ここに備考を入れたり入れなかったりする",
  },

  {
    id: 2,
    grouping_date: "2023/7/2",
    group_name: "2023年7月入社フロント",
    group_member: [{ user_id: "1", user_name: "テスト太郎" }],
    grouping_description: "",
  },

  {
    id: 3,
    grouping_date: "2023/7/6",
    group_name: "テストグループその3",
    group_member: [
      { user_id: "2", user_name: "テスト二郎" },
      { user_id: "3", user_name: "テスト三郎" },
    ],
    grouping_description: "空欄でも可",
  },
];
