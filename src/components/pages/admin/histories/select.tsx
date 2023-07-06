'use client'
import OrangeButton from "@/components/ui/button/OrangeButton";
import WhiteButton from "@/components/ui/button/WhiteButton"
import { skills,departments } from "@/const/admin_histories";
import { SyntheticEvent } from "react";
const HistoriesSelect = () => {
    function handleSubmit(e:SyntheticEvent){
        e.preventDefault()
    }
    
    return (
        <section  className="w-[80vw] ml-[10vw] border-2 text-center my-[5vh] py-[5vh]">
            <form action="submit" onSubmit={handleSubmit}>
                <div className="mb-[2vh]">
                <label htmlFor="month">回答月：</label>
                <select name="month" id="month" className="border-2">
                    <option value="202306">2023/06</option>
                </select>
                </div>
                <div className="mb-[2vh]">
                {departments.map((department)=>(
                    <WhiteButton label={department} key={department}/>
                ))}
                </div>
                <fieldset id="skill" name="skill" className="mb-[2vh]">
                <legend>使用技術：</legend>
                    {skills.map((skill)=>(
                        <span  key={skill.id}>
                        <input type="checkbox" id={skill.skill} name={skill.skill}/>
                        <label htmlFor={skill.skill}>{skill.skill}</label>
                        </span>
                    ))}
                </fieldset>
                <OrangeButton label="絞り込み" type="submit" />
            </form>
        </section>
    )
}
export default HistoriesSelect;
