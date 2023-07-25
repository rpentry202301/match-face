'use client'
import { useState } from "react"
import {HistoriesUserListHead,HistoriesUserListBody} from "./user_list"
import { Projects,AnswerRequests, Answers, Users, AnswerRequestQuestions } from '@/types/admin/histories/admin_histories'
import { useSelectHistory } from "@/hooks/store/context/historiesContext"

export default function HistoriesList ({projects,answer_requests,answers,users,answer_request_questions}:{projects:Projects,answer_requests:AnswerRequests,answers:Answers,users:Users,answer_request_questions:AnswerRequestQuestions}){
    const [open,setOpen] = useState<{id:number,status:boolean}[]>(projects.map((project)=>({id:project.id,status:false})))
    const formData = useSelectHistory()
    console.log('HistoryListコンポーネントfetch用絞り込みデータ',formData)
    // ユーザーのアコーディオン開閉
    function handleClick(id:number){
        const newOpen = open.map((state)=>{
            if (state.id===id){
                state.status=!state.status
            }
            return state
        })
        setOpen(newOpen)
    }

    return(
        <section>
                <table className="border-collapse border border-slate-deep-gray w-[75vw] ml-[12.5vw] text-center mb-[10vh]">
                <thead>
                    <tr>
                        <th className="border border-slate-deep-gray bg-light-gray w-[5vw]" id="open"></th>
                        <th className="border border-slate-deep-gray bg-light-gray w-[15vw]" id="answer_deadline">回答期限</th>
                        <th className="border border-slate-deep-gray bg-light-gray w-[15vw]" id="project_name">案件名</th>
                        <th className="border border-slate-deep-gray bg-light-gray w-[40vw]" id="project_detail">案件概要</th>
                    </tr>
                </thead>
                {projects.map((project)=>(
                <tbody  key={project.id}>
                    {((open.find((state)=>state.id===project.id))!.status===false)&&(
                        <tr>
                        <td className="border border-slate-deep-gray" id="open"><button data-testid = {`open_${project.id}`} id="open_button" name="open_button" type="button" className="text-deep-gray" onClick={()=>handleClick(project.id)}>▶︎</button></td>
                        {answer_requests.map((request)=>(
                            project.id===request.project_id&&
                                <td className="border border-slate-deep-gray" id="answer_deadline" key={request.id}>{request.deadline.slice(0,10)}</td>
                        ))}
                        <td className="border border-slate-deep-gray" id="project_name">{project.name}</td>
                        {project.detail.length<=35?
                            <td className="border border-slate-deep-gray" id="project_detail" data-testid={`project_detail_${project.id}`}>{project.detail}</td>:
                            <td className="border border-slate-deep-gray" id="project_detail" data-testid={`project_detail_${project.id}`}>{project.detail.slice(0,35)}...</td>
                        }
                        </tr>
                    )}
                    
                    {((open.find((state)=>state.id===project.id))!.status===true)&&(
                        <>
                        <tr>
                        <td className="border border-slate-deep-gray" id="open"><button data-testid = {`close_${project.id}`} id="close_button" name="close_button" type="button" className="text-deep-gray" onClick={()=>handleClick(project.id)}>▼</button></td>
                        {answer_requests.map((request)=>(
                            project.id===request.project_id&&
                                <td className="border border-slate-deep-gray" id="answer_deadline"  key={request.id}>{request.deadline.slice(0,10)}</td>
                        ))}
                        <td className="border border-slate-deep-gray" id="project_name">{project.name}</td>
                        {project.detail.length<=25?
                            <td className="border border-slate-deep-gray" id="project_detail">{project.detail}</td>:
                            <td className="border border-slate-deep-gray" id="project_detail">{project.detail.slice(0,35)}...</td>
                        }
                        </tr>
                        <tr>
                            <HistoriesUserListHead />
                        </tr>
                        <HistoriesUserListBody id={project.id} answers={answers} users={users} answer_request_questions={answer_request_questions}/>
                        </>
                    )}
                </tbody>
                ))}
            </table>
        </section>
    )
}
