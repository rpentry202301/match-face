'use client'
import GrayButton from "@/components/ui/button/GrayButton"
import { AnswerRequestQuestions, Answers, ProjectUserAnswer, Users } from "@/types/admin/histories/admin_histories"
import { useRouter } from "next/navigation"
import { SyntheticEvent } from "react"
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
export function HistoriesUserListBody({id,answers,users,answer_request_questions}:{id:number,answers:Answers,users:Users,answer_request_questions:AnswerRequestQuestions}){
    const array:ProjectUserAnswer = []
    const project_answer = answers.filter((user)=>user.answer_request_id===id)
    const project_answered_user:ProjectUserAnswer=array.concat(project_answer.map((answer)=>(
            answer_request_questions.find((question)=>question.id===answer.id)!.is_answered?
            {id:answer.id,answer_status:true,user_id:answer.user_id}:{id:answer.id,answer_status:false,user_id:answer.user_id}
        )))


        const router = useRouter()

    function handleClick(e:SyntheticEvent,id:number){
        e.preventDefault()
        router.push(`/admin/review/${id}`)
    }

    return(
        <>                
            {project_answered_user.map((user_answer)=>(
                <tr key={user_answer.id}> 
                <td></td>
                <td className="border border-slate-deep-gray" id="detail"><GrayButton data-testid={`detail_${user_answer.id}`} label="詳細" className="w-20 h-[23px] pt-[4px] text-sm" onClick={(e)=>handleClick(e,user_answer.id)}/></td>
                <td className="border border-slate-deep-gray" id="answer_status" data-testid={`status_${user_answer.id}`}>{user_answer.answer_status?"回答済み":"未回答"}</td>
                {users.map((user)=>(
                    user.id===user_answer.user_id&&
                    <td className="border border-slate-deep-gray" id="user_name" key={user_answer.id}>{user.name}</td>
                ))}
                
                </tr>
            ))}
        </>

    )
}
