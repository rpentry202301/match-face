"use client";
import OrangeButton from "@/components/ui/button/OrangeButton";
import WhiteButton from "@/components/ui/button/WhiteButton";
import { skills, departments, projects } from "@/const/admin_histories";
import { twMerge } from "tailwind-merge";
import { Dispatch, FormEvent, SetStateAction } from "react";
import { useState } from "react";

type Style = {
  className: string;
};

const HistoriesSelect = (props: Style) => {
  const [formData, setFormData] = useState<{
    month: string;
    department: string;
    skills: string[];
  }>({ month: "", department: "", skills: [] });
  const style = twMerge(
    "w-[75vw] ml-[12.5vw] border-2 text-center my-[5vh] py-[5vh]",
    props.className
  );

  // 選択用日付
  const allDeadlines: string[] = [];
  projects.map((project) => allDeadlines.push(project.answer_deadline));
  const set = new Set(allDeadlines);
  const deadlines = Array.from(set);

  return (
    <section className={style}>
      <form
        data-testid="form"
        action="submit"
        onSubmit={(e) => {
          handleSubmit(e, formData);
        }}
      >
        <div className="mb-[2vh]">
          <label htmlFor="month">回答月：</label>
          <select
            data-testid="month"
            name="month"
            id="month"
            className="border-2"
            onChange={(e) =>
              setFormData({ ...formData, month: e.target.value })
            }
          >
            <option value="">--</option>
            {deadlines.map((deadline) => (
              <option value={deadline} key={deadline}>
                {deadline}
              </option>
            ))}
          </select>
        </div>
        {props.className ? (
          ""
        ) : (
          <div className="mb-[2vh]">
            {departments.map((department) => (
              <span key={department}>
                {department !== formData.department && (
                  <WhiteButton
                    label={department}
                    key={department}
                    className="mx-[10px] w-[8vw]"
                    value={department}
                    onClick={(e) => {
                      e.preventDefault();
                      setFormData({
                        ...formData,
                        department: e.currentTarget.value,
                      });
                    }}
                  />
                )}
                {department === formData.department && (
                  <WhiteButton
                    label={department}
                    key={department}
                    value={""}
                    className="bg-deep-gray mx-[10px] w-[8vw] translate-y-0.5"
                    onClick={(e) => {
                      e.preventDefault();
                      setFormData({
                        ...formData,
                        department: e.currentTarget.value,
                      });
                    }}
                  />
                )}
              </span>
            ))}
          </div>
        )}
        <div className="flex justify-center mb-[2vh] max-w-[55vw] ml-[10vw]">
          <legend className="w-[215px] h-10 leading-10">使用技術：</legend>
          <fieldset id="skill" name="skill">
            {skills.map((skill) => (
              <span key={skill.id} className="px-[10px] whitespace-nowrap">
                <input
                  type="checkbox"
                  id={skill.skill}
                  name={skill.skill}
                  value={skill.skill}
                  onChange={(e) => setSkill(e, formData, setFormData)}
                />
                <label htmlFor={skill.skill}>{skill.skill}</label>
              </span>
            ))}
          </fieldset>
        </div>
        <OrangeButton label="絞り込み" type="submit" />
      </form>
    </section>
  );
};
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

export function handleSubmit(
  e: FormEvent<HTMLFormElement>,
  formData: { month: string; department: string; skills: string[] }
) {
  e.preventDefault();
  // 絞り込み条件をformDataに格納
  console.log(formData);
}
