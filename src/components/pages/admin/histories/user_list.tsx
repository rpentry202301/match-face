'use client'
import GrayButton from "@/components/ui/button/GrayButton"
import { AnswerUserList } from "@/types/admin/histories/admin_histories"
import { useRouter } from "next/navigation"
import { SyntheticEvent } from "react"
export function HistoriesUserListHead(){
    return(
        <>            
            <th className=" py-1"></th>
            <th className="border border-slate-deep-gray bg-light-gray py-1" id="detail"></th>
            <th className="border border-slate-deep-gray bg-light-gray py-1" id="answer_status">状態</th>
            <th className="border border-slate-deep-gray bg-light-gray py-1" id="user_name">氏名</th>
        </>
    )
}
export function HistoriesUserListBody({answer_user_list}:{answer_user_list:AnswerUserList}){
    const router = useRouter()
    function handleClick(e:SyntheticEvent,id:number){
        e.preventDefault()
        router.push(`/admin/review/${id}`)
    }

    return(
        <>                
            {answer_user_list.map((user_answer)=>(
                <tr key={user_answer.userId}> 
                <td></td>
                <td className="border border-slate-deep-gray py-2" id="detail">
                    <GrayButton data-testid={`detail_${user_answer.userId}`} label="詳細" className="w-20 max-w-[10vw] text-sm p-1" 
                        onClick={(e)=>{handleClick(e,user_answer.answerRequestId)}}
                    />
                </td>
                <td className="border border-slate-deep-gray py-2" id="answer_status" data-testid={`status_${user_answer.userId}`}>{user_answer.answered?"回答済み":"未回答"}</td>
                <td className="border border-slate-deep-gray py-2" id="user_name" key={user_answer.userId}>{user_answer.userName}</td>
                </tr>
            ))}
        </>

    )
}
