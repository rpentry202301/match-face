export type SelectHistoryAction = {
    type:'select',payload:{month:string,department:number[],skills:number[]}
}
export type Skills = {
    id: number;
    name: string;
    created_user: string;
    created_at: string;
    update_user: string;
    update_at: string;
}
export type Departments = {
    id: number;
    name: string;
    created_user: string;
    created_at: string;
    update_user: string;
    update_at: string;
}
export type AnswerRequestGroups = {
    id:number,
    project:{
        id:number,
        name:string,
        detail:string,
        enterpriseId:number,
        departmentId:number,
        skillId:number,
        questionList:any[],
        createUser:string,
        createdAt:string,
        updateUser:string,
        updateAt:string,
        deleted:boolean
    },
    department:{
        id:number,
        name:string,
        createdUser:string,
        createdAt:string,
        updateUser:string,
        updateAt:string
    },
    answerUserList:{
        answerRequestId:number,
        userId:number,
        userName:string,
        answered:boolean
    }[],
    questionCount:number,
    deadline:string,
    createdUser:string,
    createdAt:string,
    updateUser:string,
    updateAt:string
}
export type AnswerUserList = {
    answerRequestId:number,
    userId:number,
    userName:string,
    answered:boolean
}[]
