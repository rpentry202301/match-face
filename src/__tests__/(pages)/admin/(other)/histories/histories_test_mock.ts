export const projectsMock = [
    {id:1,name:'テスト1',detail:'テスト1の説明',enterprise_id:1,department_id:1,created_user:'テスト花子',created_at:'2023-07-10T16:52:46.053Z',update_user:'テスト花子',update_at:'2023-07-10T16:52:46.053Z'},
    {id:2,name:'テスト2',detail:'テスト2の説明(文字数34)テスト2の説明テスト2の説明テスト2の説明',enterprise_id:1,department_id:1,created_user:'テスト花子',created_at:'2023-07-10T16:52:46.053Z',update_user:'テスト花子',update_at:'2023-07-10T16:52:46.053Z'},
    {id:3,name:'テスト3',detail:'テスト3の説明(文字数35)テスト3の説明テスト3の説明テスト3の説明テ',enterprise_id:1,department_id:1,created_user:'テスト花子',created_at:'2023-07-10T16:52:46.053Z',update_user:'テスト花子',update_at:'2023-07-10T16:52:46.053Z'},
    {id:4,name:'テスト4',detail:'テスト4の説明',enterprise_id:1,department_id:2,created_user:'テスト花子',created_at:'2023-07-10T16:52:46.053Z',update_user:'テスト花子',update_at:'2023-07-10T16:52:46.053Z'},
    {id:5,name:'テスト5',detail:'テスト5の説明',enterprise_id:1,department_id:1,created_user:'テスト花子',created_at:'2023-07-10T16:52:46.053Z',update_user:'テスト花子',update_at:'2023-07-10T16:52:46.053Z'},
]
export const answer_requestsMock=[
    {id:1,user_id:[1,2],administrator_id:3,project_id:1,request_at:'2023-07-10T16:52:46.053Z',deadline:"2023-07-10T16:52:46.053Z",created_user:'テスト花子',created_at:'2023-07-10T16:52:46.053Z',update_user:'テスト花子',update_at:'2023-07-10T16:52:46.053Z'},
    {id:2,user_id:[],administrator_id:3,project_id:2,request_at:'2023-07-10T16:52:46.053Z',deadline:"2023-07-10T16:52:46.053Z",created_user:'テスト花子',created_at:'2023-07-10T16:52:46.053Z',update_user:'テスト花子',update_at:'2023-07-10T16:52:46.053Z'},
    {id:3,user_id:[],administrator_id:3,project_id:3,request_at:'2023-07-10T16:52:46.053Z',deadline:"2023-07-10T16:52:46.053Z",created_user:'テスト花子',created_at:'2023-07-10T16:52:46.053Z',update_user:'テスト花子',update_at:'2023-07-10T16:52:46.053Z'},
    {id:4,user_id:[],administrator_id:3,project_id:4,request_at:'2023-07-10T16:52:46.053Z',deadline:"2023-07-10T16:52:46.053Z",created_user:'テスト花子',created_at:'2023-07-10T16:52:46.053Z',update_user:'テスト花子',update_at:'2023-07-10T16:52:46.053Z'},
    {id:5,user_id:[],administrator_id:3,project_id:5,request_at:'2023-07-10T16:52:46.053Z',deadline:"2023-08-10T16:52:46.053Z",created_user:'テスト花子',created_at:'2023-07-10T16:52:46.053Z',update_user:'テスト花子',update_at:'2023-07-10T16:52:46.053Z'},
]
export const answersMock = [
    {id:1,context:'テスト回答1',question_id:1,answer_request_id:1,user_id:1,Model_answer_fl:false,created_user:'テスト花子',created_at:'2023-07-10T16:52:46.053Z',update_user:'テスト花子',update_at:'2023-07-11T16:52:46.053Z'},
    {id:2,context:'テスト回答2',question_id:1,answer_request_id:1,user_id:2,Model_answer_fl:false,created_user:'テスト花子',created_at:'2023-07-10T16:52:46.053Z',update_user:'テスト花子',update_at:'2023-07-10T16:52:46.053Z'},
]
export const usersMock = [
    {id:1,name:'テスト太郎',password:'test1',email:'test1@example.com',hire_date:'2023-01-01',department_id:1,status_id:1,created_user:'テスト花子',created_at:'2023-07-10T16:52:46.053Z',update_user:'テスト花子',update_at:'2023-07-10T16:52:46.053Z'},
    {id:2,name:'テスト次郎',password:'test2',email:'test2@example.com',hire_date:'2023-01-01',department_id:1,status_id:1,created_user:'テスト花子',created_at:'2023-07-10T16:52:46.053Z',update_user:'テスト花子',update_at:'2023-07-10T16:52:46.053Z'},
    ]
export const answer_request_questionsMock = [
    {id:1,question_id:1,answer_request_id:1,is_answered:true,created_user:'テスト花子',created_at:'2023-07-10T16:52:46.053Z',update_user:'テスト花子',update_at:'2023-07-10T16:52:46.053Z'},
    {id:2,question_id:1,answer_request_id:1,is_answered:false,created_user:'テスト花子',created_at:'2023-07-10T16:52:46.053Z',update_user:'テスト花子',update_at:'2023-07-10T16:52:46.053Z'},
]
export const project_skillsMock = [
    {id:1,project_id:1,skill_id:[1],created_user:'テスト花子',created_at:'2023-07-10T16:52:46.053Z',update_user:'テスト花子',update_at:'2023-07-10T16:52:46.053Z'},
    {id:2,project_id:2,skill_id:[1,2],created_user:'テスト花子',created_at:'2023-07-10T16:52:46.053Z',update_user:'テスト花子',update_at:'2023-07-10T16:52:46.053Z'},
    {id:3,project_id:3,skill_id:[2],created_user:'テスト花子',created_at:'2023-07-10T16:52:46.053Z',update_user:'テスト花子',update_at:'2023-07-10T16:52:46.053Z'},
    {id:4,project_id:4,skill_id:[1],created_user:'テスト花子',created_at:'2023-07-10T16:52:46.053Z',update_user:'テスト花子',update_at:'2023-07-10T16:52:46.053Z'},
    {id:5,project_id:5,skill_id:[1],created_user:'テスト花子',created_at:'2023-07-10T16:52:46.053Z',update_user:'テスト花子',update_at:'2023-07-10T16:52:46.053Z'},
]
export const skillsMock = [
    {id:1,skill:"JavaScript",created_user:'テスト花子',created_at:'2023-07-10T16:52:46.053Z',update_user:'テスト花子',update_at:'2023-07-10T16:52:46.053Z'},
    {id:2,skill:"TypeScript",created_user:'テスト花子',created_at:'2023-07-10T16:52:46.053Z',update_user:'テスト花子',update_at:'2023-07-10T16:52:46.053Z'}
]
export const departmentsMock = [
    {id:1,name:"FR",created_user:"テスト花子",created_at:"2023-07-10T16:52:46.053Z",update_user:'テスト花子',update_at:"2023-07-10T16:52:46.053Z"},
    {id:2,name:"Java",created_user:"テスト花子",created_at:"2023-07-10T16:52:46.053Z",update_user:'テスト花子',update_at:"2023-07-10T16:52:46.053Z"},
]
