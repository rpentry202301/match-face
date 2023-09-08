"use client";
import OrangeButton from "@/components/ui/button/OrangeButton";
import { twMerge } from "tailwind-merge";
import { Dispatch, FormEvent, SetStateAction, Suspense, useEffect } from "react";
import { useState } from "react";
import { AnswerRequestGroups, Departments, SelectHistoryAction, Skills } from "@/types/admin/histories/admin_histories";
import { useSelectHistoryDispatch } from "@/hooks/store/context/historiesContext";
import Loading from "@/components/elements/loading/Loading";
import WhiteButtonCheckBox from "../tasks/register/parts/WhiteButtonCheckBox";

const HistoriesSelect = ({className}:{className:string}) => {
    const [formData,setFormData] = useState<{month:string,department:number[],skills:number[]}>({month:"",department:[],skills:[]})
    const dispatch:Dispatch<SelectHistoryAction> = useSelectHistoryDispatch()
    const style = twMerge(
        "w-[75vw] ml-[12.5vw] border-2 text-center my-[5vh] py-[5vh]  max-md:w-[90vw] max-md:ml-[5vw]",
        className
        );
    const [departments,setDepartments] = useState([])
    const [skills,setSkills] = useState([])
    const [answer_request_groups,setAnswerRequestGroups] = useState([])


    useEffect(()=>{
        async function setData(){
            const response_departments = await fetch('/api/admin/histories/departments')
            if (!response_departments.ok){ throw new Error('Failed to fetch data');}
            const department = await response_departments.json()
            setDepartments(department)
            const response_skills = await fetch('/api/admin/histories/skills')
            if (!response_skills.ok){ throw new Error('Failed to fetch data');}
            const skill = await response_skills.json()
            setSkills(skill)
            const response_answer_request_groups = await fetch('/api/admin/histories')
            if (!response_answer_request_groups.ok){ throw new Error('Failed to fetch data');}
            const answer_request_group = await response_answer_request_groups.json()
            setAnswerRequestGroups(answer_request_group)
        }
        setData()
    },[])

    // 選択用日付
    const allAnswerDate:string[] = []

    answer_request_groups.map((request:AnswerRequestGroups)=>{
        allAnswerDate.push(`${request.updateAt.slice(0,7)}`)
        }
    )
    const set = new Set(allAnswerDate)
    const answerDate = Array.from(set)
    
    return (
        <Suspense fallback={<Loading/>}>        
        <section  className={style}>
            <form data-testid="form" action="submit" onSubmit={(e)=>{handleSubmit(e,formData,dispatch)}}>
                <div className="mb-[2vh]">
                    <label htmlFor="month">更新月：</label>
                    <select data-testid="month" name="month" id="month" className="border-2" onChange={(e)=>setFormData({...formData,month:e.target.value})}>
                        <option value="">--</option>
                        {answerDate.map((date)=>(
                            <option value={date} key={date}>{date}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-[1.5vh] flex mx-auto flex-wrap w-[65vw] justify-between max-lg:after:contents:'' max-lg:after:w-[100px] max-lg:before:contents:'' max-lg:before:w-[100px] max-lg:before:order-1">
                    {departments.map((department:Departments)=>(
                        <WhiteButtonCheckBox 
                            label={department.name} key={department.id} value={department.id} id={department.name}
                            className="text-sm w-[100px] mb-2"
                            onClick={(e) => {
                            setArray(e, formData, setFormData, 'department');
                            } }/>
                    ))}
                </div>
                <div className="lg:flex justify-center mb-[2vh] w-[55vw] ml-[10vw] max-md:w-[70vw]">
                <legend className="lg:w-[215px] lg:h-10 lg:leading-10">使用技術：</legend>
                <fieldset id="skill" name="skill" className="text-justify">
                        {skills.map((skill:Skills)=>(
                            <span  key={skill.id} className="px-[10px] whitespace-nowrap">
                            <input type="checkbox" id={skill.name} name={skill.name} value={skill.id}
                                onChange={(e)=>setArray(e,formData,setFormData,'skills')}/>
                            <label htmlFor={skill.name}>{skill.name}</label>
                            </span>
                        ))}
                </fieldset>
                </div>
                <OrangeButton label="絞り込み" type="submit" />
            </form>
        </section>
        </Suspense>
    )
}
export default HistoriesSelect;

export function setArray(
  e: FormEvent<HTMLInputElement>|FormEvent<HTMLButtonElement>,
  formData: { month: string; department: number[]; skills: number[] },
  setFormData: Dispatch<
    SetStateAction<{ month: string; department: number[]; skills: number[] }>
  >,
  category:string
) {
  const selectArray = [];
  if(category==='department'){
        // 選択済みの項目は選択解除、未選択の項目は選択済みにする
        formData.department.includes(Number(e.currentTarget.value))
        ? selectArray.push(
            ...formData.department.filter(
                (d: number) => d !== Number(e.currentTarget.value)
            )
            )
        : selectArray.push(...formData.department, Number(e.currentTarget.value));
        setFormData({ ...formData, department: selectArray });
  }else{
        // 選択済みの項目は選択解除、未選択の項目は選択済みにする
        formData.skills.includes(Number(e.currentTarget.value))
        ? selectArray.push(
            ...formData.skills.filter(
            (skill: number) => skill !== Number(e.currentTarget.value)
            )
        )
        : selectArray.push(...formData.skills, Number(e.currentTarget.value));
        setFormData({ ...formData, skills: selectArray });
  }
}

export function handleSubmit(e:FormEvent<HTMLFormElement>,formData:{month:string,department:number[],skills:number[]},dispatch:Dispatch<SelectHistoryAction>){
    e.preventDefault()
    dispatch({type:'select',payload:formData})
}
