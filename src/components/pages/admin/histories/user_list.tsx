import { answered_user } from "@/const/admin_histories"
export function HistoriesUserListHead(){
    return(
        <>            
            <th></th>
            <th className="border border-slate-deep-gray bg-light-gray" id="detail"></th>
            <th className="border border-slate-deep-gray bg-light-gray" id="answer_status">状態</th>
            <th className="border border-slate-deep-gray bg-light-gray" id="user_name">氏名</th>
        </>

    )
}
export function HistoriesUserListBody({id}:{id:number}){
    console.log(answered_user)
    const project_answered_user = answered_user.filter((user)=>user.project_id===id)
    return(
        <>                
            {project_answered_user.map((user)=>(
                <tr> 
                <td></td>
                <td className="border border-slate-deep-gray" id="detail"><button type="button">詳細</button></td>
                <td className="border border-slate-deep-gray" id="answer_status">{user.answer_status?"回答済み":"未回答"}</td>
                <td className="border border-slate-deep-gray" id="user_name">{user.user_name}</td>
                </tr>
            ))}
        </>

    )
}
