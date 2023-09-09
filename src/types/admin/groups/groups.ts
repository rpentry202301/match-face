export type Groups = {
id:string,
name:string,
createdUser:string,
description:string,
createdAt:string,
updatedUser:string,
updatedAt:string,
// ここ確認、中身
userList:any[], 
memberCount:number
}

export type GroupAction = | {
type:'SET_DATA'; payload:Groups[]
} 