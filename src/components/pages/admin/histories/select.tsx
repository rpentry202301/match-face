"use client";
import OrangeButton from "@/components/ui/button/OrangeButton";
import WhiteButton from "@/components/ui/button/WhiteButton"
// import { skills,departments,projects } from "@/const/admin_histories";
import { twMerge } from "tailwind-merge";
import { Dispatch, FormEvent, SetStateAction } from "react";
import { useState } from "react";
import { AnswerRequests, Departments, Projects, Skills } from "@/types/admin/histories/admin_histories";


const HistoriesSelect = ({className,projects,answer_requests,departments,skills}:{className:string,projects:Projects,answer_requests:AnswerRequests,departments:Departments,skills:Skills}) => {
    const [formData,setFormData] = useState<{month:string,department:string,skills:string[]}>({month:"",department:"",skills:[]})
    const style = twMerge(
        "w-[75vw] ml-[12.5vw] border-2 text-center my-[5vh] py-[5vh]",
        className
        );

    // 選択用日付
    const allDeadlines:string[] = []
    projects.map((project)=>
        answer_requests.map((request)=>
            request.project_id===project.id&&allDeadlines.push(`${request.deadline.slice(0,7)}`)
        )
    )
    const set = new Set(allDeadlines)
    const deadlines = Array.from(set)

    

    return (
        <section  className={style}>
            <form data-testid="form" action="submit" onSubmit={(e)=>{handleSubmit(e,formData)}}>
                <div className="mb-[2vh]">
                    <label htmlFor="month">回答月：</label>
                    <select data-testid="month" name="month" id="month" className="border-2" onChange={(e)=>setFormData({...formData,month:e.target.value})}>
                        <option value="">--</option>
                        {deadlines.map((deadline)=>(
                            <option value={deadline} key={deadline}>{deadline}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-[2vh]">
                    {departments.map((department)=>(
                        <span key={department.id}>
                        {department.name!==formData.department&&
                            <WhiteButton label={department.name} key={department.id} className="mx-[10px] w-[8vw] max-sm:w-[15vw] max-sm:mb-[8px]" value={department.name} 
                                    onClick={(e)=>
                                        {e.preventDefault()
                                        setFormData({...formData,department:e.currentTarget.value})}}/>}
                        {department.name===formData.department&&
                            <WhiteButton label={department.name} key={department.id} value={""} className="bg-deep-gray mx-[10px] w-[8vw] translate-y-0.5 max-sm:w-[15vw] max-sm:mb-[8px]"
                                    onClick={(e)=>
                                        {e.preventDefault()
                                        setFormData({...formData,department:e.currentTarget.value})}}/>}
                        </span>
                    ))}
                </div>
                <div className="lg:flex justify-center mb-[2vh] max-w-[55vw] ml-[10vw]">
                <legend className="lg:w-[215px] lg:h-10 lg:leading-10">使用技術：</legend>
                <fieldset id="skill" name="skill">
                        {skills.map((skill)=>(
                            <span  key={skill.id} className="px-[10px] whitespace-nowrap">
                            <input type="checkbox" id={skill.skill} name={skill.skill} value={skill.skill}
                                onChange={(e)=>setSkill(e,formData,setFormData)}/>
                            <label htmlFor={skill.skill}>{skill.skill}</label>
                            </span>
                        ))}
                </fieldset>
                </div>
                <OrangeButton label="絞り込み" type="submit" />
            </form>
        </section>
    )
}
export default HistoriesSelect;

export function setSkill(
  e: any,
  formData: { month: string; department: string; skills: string[] },
  setFormData: Dispatch<
    SetStateAction<{ month: string; department: string; skills: string[] }>
  >
) {
  const selectSkills = [];
  // 選択済みの項目は選択解除、未選択の項目は選択済みにする
  formData.skills.includes(e.currentTarget.value)
    ? selectSkills.push(
        ...formData.skills.filter(
          (skill: string) => skill !== e.currentTarget.value
        )
      )
    : selectSkills.push(...formData.skills, e.currentTarget.value);
  setFormData({ ...formData, skills: selectSkills });
}

export function handleSubmit(e:FormEvent<HTMLFormElement>,formData:{month:string,department:string,skills:string[]}){
    e.preventDefault()
    // 一旦絞り込み条件をformDataに格納
    console.log(formData)
}
