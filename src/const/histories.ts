type Data = {
  id: number;
  comment_created_at: boolean;
  name: string;
  detail: string;
  answer_update_at: string;
  skill_id: number[];
}[];

export const projects: Data = [
  {
    id: 1,
    comment_created_at: true,
    name: "ポムポムプリン",
    detail:
      "日本のサンリオによるゴールデン・レトリバーの男のコをモチーフにしたキャラクター。",
    answer_update_at: "2023-07-10T16:52:46.053Z",
    skill_id: [1, 2, 3],
  },
  {
    id: 2,
    comment_created_at: false,
    name: "ポムポムプリン",
    detail:
      "日本のサンリオによるゴールデン・レトリバーの男のコをモチーフにしたキャラクター。",
    answer_update_at: "2023-07-10T16:52:46.053Z",
    skill_id: [2, 3, 4],
  },
  {
    id: 3,
    comment_created_at: false,
    name: "ポムポムプリン",
    detail:
      "日本のサンリオによるゴールデン・レトリバーの男のコをモチーフにしたキャラクター。",
    answer_update_at: "2023-07-10T16:52:46.053Z",
    skill_id: [5, 6, 7],
  },
  {
    id: 4,
    comment_created_at: true,
    name: "ポムポムプリン",
    detail:
      "日本のサンリオによるゴールデン・レトリバーの男のコをモチーフにしたキャラクター。",
    answer_update_at: "2023-07-10T16:52:46.053Z",
    skill_id: [1, 2, 6, 7],
  },
  {
    id: 5,
    comment_created_at: true,
    name: "ポムポムプリン",
    detail:
      "日本のサンリオによるゴールデン・レトリバーの男のコをモチーフにしたキャラクター。",
    answer_update_at: "2023-07-10T16:52:46.053Z",
    skill_id: [3, 4, 5],
  },
  {
    id: 6,
    comment_created_at: false,
    name: "ポムポムプリン",
    detail:
      "日本のサンリオによるゴールデン・レトリバーの男のコをモチーフにしたキャラクター。",
    answer_update_at: "2023-08-10T16:52:46.053Z",
    skill_id: [1, 2, 3],
  },
  {
    id: 7,
    comment_created_at: true,
    name: "ポムポムプリン",
    detail:
      "日本のサンリオによるゴールデン・レトリバーの男のコをモチーフにしたキャラクター。",
    answer_update_at: "2023-08-10T16:52:46.053Z",
    skill_id: [1, 2, 3],
  },
];

// export {data};

export const skills = [
  {
    id: 1,
    skill: "JavaScript",
    created_user: "rakus",
    created_at: "2023-07-10T16:52:46.053Z",
    update_user: "rakus",
    update_at: "2023-07-10T16:52:46.053Z",
  },
  {
    id: 2,
    skill: "TypeScript",
    created_user: "rakus",
    created_at: "2023-07-10T16:52:46.053Z",
    update_user: "rakus",
    update_at: "2023-07-10T16:52:46.053Z",
  },
  {
    id: 3,
    skill: "React",
    created_user: "rakus",
    created_at: "2023-07-10T16:52:46.053Z",
    update_user: "rakus",
    update_at: "2023-07-10T16:52:46.053Z",
  },
  {
    id: 4,
    skill: "Next.js",
    created_user: "rakus",
    created_at: "2023-07-10T16:52:46.053Z",
    update_user: "rakus",
    update_at: "2023-07-10T16:52:46.053Z",
  },
  {
    id: 5,
    skill: "Vue.js",
    created_user: "rakus",
    created_at: "2023-07-10T16:52:46.053Z",
    update_user: "rakus",
    update_at: "2023-07-10T16:52:46.053Z",
  },
  {
    id: 6,
    skill: "Angular",
    created_user: "rakus",
    created_at: "2023-07-10T16:52:46.053Z",
    update_user: "rakus",
    update_at: "2023-07-10T16:52:46.053Z",
  },
  {
    id: 7,
    skill: "Nuxt.js",
    created_user: "rakus",
    created_at: "2023-07-10T16:52:46.053Z",
    update_user: "rakus",
    update_at: "2023-07-10T16:52:46.053Z",
  },
  {
    id: 8,
    skill: "jQuery",
    created_user: "rakus",
    created_at: "2023-07-10T16:52:46.053Z",
    update_user: "rakus",
    update_at: "2023-07-10T16:52:46.053Z",
  },
  {
    id: 9,
    skill: "Redux",
    created_user: "rakus",
    created_at: "2023-07-10T16:52:46.053Z",
    update_user: "rakus",
    update_at: "2023-07-10T16:52:46.053Z",
  },
  {
    id: 10,
    skill: "vuex",
    created_user: "rakus",
    created_at: "2023-07-10T16:52:46.053Z",
    update_user: "rakus",
    update_at: "2023-07-10T16:52:46.053Z",
  },
  {
    id: 11,
    skill: "MaterialUI",
    created_user: "rakus",
    created_at: "2023-07-10T16:52:46.053Z",
    update_user: "rakus",
    update_at: "2023-07-10T16:52:46.053Z",
  },
  {
    id: 12,
    skill: "tailwind",
    created_user: "rakus",
    created_at: "2023-07-10T16:52:46.053Z",
    update_user: "rakus",
    update_at: "2023-07-10T16:52:46.053Z",
  },
  {
    id: 13,
    skill: "Bootstrap",
    created_user: "rakus",
    created_at: "2023-07-10T16:52:46.053Z",
    update_user: "rakus",
    update_at: "2023-07-10T16:52:46.053Z",
  },
  {
    id: 14,
    skill: "Vercel",
    created_user: "rakus",
    created_at: "2023-07-10T16:52:46.053Z",
    update_user: "rakus",
    update_at: "2023-07-10T16:52:46.053Z",
  },
];
