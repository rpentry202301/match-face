export type DataType = {
  id: number;
  comment_created_at: boolean;
  name: string;
  detail: string;
  answer_update_at: string;
  skill_id: number[];
}[];

export type SkillType = {
  id: number;
  name: string;
  createdUser: string;
  createdAt: string;
  updateUser: string;
  updateAt: string;
}[];

export const projects: DataType = [
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
    name: "日暮らし、",
    detail:
      "硯にむかひて、心にうつりゆくよしなし事を、そこはかとなく書きつくれば、あやしうこそものぐるほしけれ。",
    answer_update_at: "2023-07-10T16:52:46.053Z",
    skill_id: [2, 3, 4],
  },
  {
    id: 3,
    comment_created_at: false,
    name: "親譲りの無鉄砲で",
    detail:
      "小供の時から損ばかりしている。小学校に居る時分学校の二階から飛び降りて一週間ほど腰を抜かした事がある。",
    answer_update_at: "2023-07-10T16:52:46.053Z",
    skill_id: [5, 6, 7],
  },
  {
    id: 4,
    comment_created_at: true,
    name: "なぜそんな無闇を",
    detail:
      "したと聞く人があるかも知れぬ。別段深い理由でもない。新築の二階から首を出していたら、同級生の一人が冗談に、いくら威張っても、そこから飛び降りる事は出来まい。",
    answer_update_at: "2023-07-10T16:52:46.053Z",
    skill_id: [1, 2, 6, 7],
  },
  {
    id: 5,
    comment_created_at: true,
    name: "ポムポムプリン",
    detail:
      "日本のサンリオによるゴールデン・レトリバーの男のコをモチーフにしたキャラクター。",
    answer_update_at: "2023-10-10T16:52:46.053Z",
    skill_id: [3, 4, 5],
  },
  {
    id: 6,
    comment_created_at: false,
    name: "弱虫やーい。",
    detail:
      "と囃したからである。小使に負ぶさって帰って来た時、おやじが大きな眼をして二階ぐらいから飛び降りて腰を抜かす奴があるかと云ったから",
    answer_update_at: "2023-10-10T16:52:46.053Z",
    skill_id: [1, 2, 3],
  },
  {
    id: 7,
    comment_created_at: true,
    name: "つれづれなるまゝ",
    detail:
      "日暮らし、硯にむかひて、心にうつりゆくよしなし事を、そこはかとなく書きつくれば、あやしうこそものぐるほしけれ。",
    answer_update_at: "2023-10-10T16:52:46.053Z",
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
