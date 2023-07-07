import { answered_user } from "@/const/admin_histories"
import GrayButton from "@/components/ui/button/GrayButton"
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
    const project_answered_user = answered_user.filter((user)=>user.project_id===id)
    return(
        <>                
            {project_answered_user.map((user)=>(
                <tr key={user.id}> 
                <td></td>
                <td className="border border-slate-deep-gray" id="detail"><GrayButton label="詳細" className="bg-neutral-300 drop-shadow-lg hover:brightness-95 active:drop-shadow-none active:shadow-inner active:mt-0.5 text-black rounded-xl w-20 h-[20px] text-sm"/></td>
                <td className="border border-slate-deep-gray" id="answer_status">{user.answer_status?"回答済み":"未回答"}</td>
                <td className="border border-slate-deep-gray" id="user_name">{user.user_name}</td>
                </tr>
            ))}
        </>

    )
}
