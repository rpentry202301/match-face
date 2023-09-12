'use client'
import { Suspense, useEffect, useState } from "react"
import {HistoriesUserListHead,HistoriesUserListBody} from "./user_list"
import { AnswerRequestGroups } from '@/types/admin/histories/admin_histories'
import { useSelectHistory } from "@/hooks/store/context/historiesContext"
import Loading from "@/components/elements/loading/Loading"

export default function HistoriesList (){
    const [answer_request_groups,setAnswerRequestGroups] = useState([])
    const [open,setOpen] = useState<{id:number,status:boolean}[]>([])
    const [selectProjects,setSelectProjects] = useState<AnswerRequestGroups[]>([])
    const formData:{month:string,department:number[],skills:number[]}| undefined = useSelectHistory()

    useEffect(()=>{
        async function setData(){
            const response_answer_request_groups = await fetch('/api/admin/histories')
            if(!response_answer_request_groups.ok){throw new Error('Failed to fetch data')}
            const answer_request_group = await response_answer_request_groups.json()
            setAnswerRequestGroups(answer_request_group)
        }
        setData()
    },[])

    useEffect(()=>{
        setOpen(answer_request_groups.map((project:AnswerRequestGroups)=>({id:project.id,status:false})))
        setSelectProjects(answer_request_groups)
    },[answer_request_groups])

    // ユーザーのアコーディオン開閉
    function handleClick(id:number){
        const newOpen = open?.map((state)=>{
            if (state.id===id){
                state.status=!state.status
            }
            return state
        })
        setOpen(newOpen)
    }

    async function sortData(formData:{month:string,department:number[],skills:number[]}| undefined){
        let data:AnswerRequestGroups[] = []
        data = answer_request_groups
        if(formData===undefined||(formData.month===""&&formData.department.length===0&&formData.skills.length===0)){
            data = answer_request_groups
        }else{
            const response = await fetch(`/api/admin/histories/select?answerDate=${formData.month}-01&departmentId=${formData.department}&skillId=${formData.skills}`)
            if(!response.ok)throw new Error('Failed to fetch data')
            const select_data = await response.json()
            data = select_data
        }
        setSelectProjects(data)
    }

    useEffect(()=>{
        sortData(formData)
    },[formData])

    return(
        <Suspense fallback={<Loading/>}> 
        <section className=" max-md:overflow-x-auto max-md:mb-[30px]">
                <table className="border-collapse border border-slate-deep-gray w-[75vw] ml-[12.5vw] text-center mb-[10vh] max-md:w-[180vw] max-md:mb-1 max-md:mx-[5vw]">
                <thead>
                    <tr>
                        <th className="border border-slate-deep-gray bg-light-gray w-[5vw] py-2" id="open"></th>
                        <th className="border border-slate-deep-gray bg-light-gray w-[15vw] py-2" id="answer_answerDate">最終更新日</th>
                        <th className="border border-slate-deep-gray bg-light-gray w-[15vw] py-2" id="project_name">案件名</th>
                        <th className="border border-slate-deep-gray bg-light-gray w-[40vw] py-2" id="project_detail">案件概要</th>
                    </tr>
                </thead>
                {selectProjects.map((project:AnswerRequestGroups)=>(
                <tbody key={project.id}>
                        {(open.find((state)=>state.id===project.id)!.status===false)&&(
                        <tr>
                            <td className="border border-slate-deep-gray py-2" id="open"><button id="open_button" name="open_button" type="button" className="text-deep-gray" data-testid={`open_${project.id}`}
                                onClick={()=>handleClick(project.id)}
                            >▶︎</button></td>
                            <td className="border border-slate-deep-gray py-2" id="answer_answerDate">{project.updateAt.slice(0,10)}</td>
                            <td className="border border-slate-deep-gray py-2" id="project_name">{project.project.name}</td>
                            {project.project.detail.length<=35?
                                <td className="border border-slate-deep-gray py-2" id="project_detail" data-testid={`project_detail_${project.id}`}>{project.project.detail}</td>:
                                <td className="border border-slate-deep-gray py-2" id="project_detail" data-testid={`project_detail_${project.id}`}>{project.project.detail.slice(0,35)}...</td>
                            }
                        </tr>
                        )}
                        {(open.find((state)=>state.id===project.id)!.status===true)&&
                        <>
                        <tr>
                            <td className="border border-slate-deep-gray py-2" id="close"><button id="close_button" name="close_button" type="button" className="text-deep-gray" data-testid={`close_${project.id}`}
                                onClick={()=>handleClick(project.id)}
                            >▼</button></td>
                            <td className="border border-slate-deep-gray py-2" id="answer_answerDate">{project.updateAt.slice(0,10)}</td>
                            <td className="border border-slate-deep-gray py-2" id="project_name">{project.project.name}</td>
                            {project.project.detail.length<=35?
                                <td className="border border-slate-deep-gray py-2" id="project_detail" data-testid={`project_detail_${project.id}`}>{project.project.detail}</td>:
                                <td className="border border-slate-deep-gray py-2" id="project_detail" data-testid={`project_detail_${project.id}`}>{project.project.detail.slice(0,35)}...</td>
                            }
                        </tr>
                        <tr>
                            <HistoriesUserListHead />
                        </tr>
                        <HistoriesUserListBody  answer_user_list={project.answerUserList}/>                        
                        </>
                        }
                </tbody>
                ))}
            </table>
        </section>
        </Suspense>
    )
}
