export const skills = [
    {id:1,skill:"JavaScript"},
    {id:2,skill:"TypeScript"},
    {id:3,skill:"React"},
    {id:4,skill:"Next.js"},
    {id:5,skill:"Vue.js"},
    {id:6,skill:"Angular"},
    {id:7,skill:"Nuxt.js"},
    {id:8,skill:"jQuery"},
    {id:9,skill:"Redux"},
    {id:10,skill:"vuex"},
    {id:11,skill:"MaterialUI"},
    {id:12,skill:"tailwind"},
    {id:13,skill:"Bootstrap"},
    {id:14,skill:"Vercel"}
]

export const departments = [
    "Java","PHP","FR","CL","ML","QA"
]

export const projects = [
    {id:1,project_name:"案件A",project_detail:"案件Aの説明",department:"FR",answer_deadline:"2023-07",skills:["TypeScript","React","Redux"]},
    {id:2,project_name:"案件B",project_detail:"案件Bの説明",department:"FR",answer_deadline:"2023-07",skills:["TypeScript","React","tailwind"]},
    {id:3,project_name:"案件C",project_detail:"案件Cの説明",department:"Java",answer_deadline:"2023-07",skills:["Java","JQuery","Bootstrap"]},
    {id:4,project_name:"案件D",project_detail:"案件Dの説明",department:"FR",answer_deadline:"2023-08",skills:["TypeScript","React","Redux"]},
    {id:5,project_name:"案件E",project_detail:"案件Eの説明",department:"FR",answer_deadline:"2023-08",skills:["JavaScript","Vue.js","vuex"]},
]

export const answered_user = [
    {id:1,project_id:1,answer_status:true,user_name:"田中太郎"},
    {id:2,project_id:1,answer_status:true,user_name:"山田次郎"},
    {id:3,project_id:2,answer_status:true,user_name:"佐藤三郎"},
    {id:4,project_id:3,answer_status:false,user_name:"鈴木四郎"},
    {id:5,project_id:3,answer_status:true,user_name:"高橋五郎"},
]
