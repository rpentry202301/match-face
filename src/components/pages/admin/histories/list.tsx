'use client'
import { useEffect, useState } from "react"
import {HistoriesUserListHead,HistoriesUserListBody} from "./user_list"
import { Projects,AnswerRequests, Answers, Users, AnswerRequestQuestions, ProjectSkills } from '@/types/admin/histories/admin_histories'
import { useSelectHistory } from "@/hooks/store/context/historiesContext"

export default function HistoriesList ({projects,answer_requests,answers,users,answer_request_questions,project_skills}:{projects:Projects,answer_requests:AnswerRequests,answers:Answers,users:Users,answer_request_questions:AnswerRequestQuestions,project_skills:ProjectSkills}){
    const [open,setOpen] = useState<{id:number,status:boolean}[]>(projects.map((project)=>({id:project.id,status:false})))
    const [selectProjects,setSelectProjects] = useState(projects)
    const formData:{month:string,department:null|number,skills:number[]}| undefined = useSelectHistory()
    
    function sortData(formData:{month:string,department:null|number,skills:number[]}| undefined){
        let data:Projects = []
        data = projects
        if(formData===undefined||(formData.month===""&&formData.department===null&&formData.skills.length===0)){
            data = projects
        }else{
            if(formData.month===""){
                data = data
            }else{
                let select_deadline = answer_requests.filter((req) => req.deadline.includes(formData.month))
                let select_data:Projects = []
                select_deadline.map((deadline)=>{
                    projects.map((project)=>{if(deadline.id===project.id){
                      select_data.push(project)
                }})})
                data = select_data
            }
            if(formData.department===null){
                data = data
            }else{
                let select_department = data.filter((d)=>d.department_id===formData.department)
                data = select_department
            }
            if(formData.skills.length === 0){
                data = data
            }else{
                const set = new Set(formData.skills.flatMap((s)=>project_skills.filter((skill)=>skill.skill_id.includes(s))))
                const set_projects = [...set]
                const select_projects = set_projects.flatMap((s)=>data.filter((p)=>p.id===s.project_id))
                data = select_projects
            }
        }
        setSelectProjects(data)
    }
    
    useEffect(()=>{
        sortData(formData)
    },[formData])
    
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
                {selectProjects.map((project)=>(
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
