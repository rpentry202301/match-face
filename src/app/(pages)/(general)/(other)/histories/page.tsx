"use client";

import HistoryList from "@/components/pages/general/histories/HistoryList";
import OrangeButton from "@/components/ui/button/OrangeButton";
import { skills } from "@/const/histories";
import React from "react";
import { useState } from "react";
import { projects } from "@/const/histories";
import type { Data } from "@/const/histories";

const HistoriesPage = () => {
  const [month, setMonth] = useState("");
  const [selectSkills, setSelectSkills] = useState<number[]>([]);
  const [selectProject, setSelectProject] = useState<Data>([]);

  const deadlines = [
    { id: 1, value: "2023-07" },
    { id: 2, value: "2023-10" },
    { id: 3, value: "2023-12" },
  ];

  // Month選択
  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  // skill選択
  const handleSkillChange = (e) => {
    const skillId = parseInt(e.target.value);
    if (e.target.checked) {
      // チェックが入った場合、スキルの配列に追加
      setSelectSkills((prevSkills) => [...prevSkills, skillId]);
    } else {
      // チェックが外れた場合、スキルの配列から削除
      setSelectSkills((prevSkills) =>
        prevSkills.filter((id) => id !== skillId)
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectSkills.length > 0 && month) {
      const newSelectProject = projects.filter(
        (project) =>
          project.skill_id.some((skillId) => selectSkills.includes(skillId)) &&
          project.answer_update_at.slice(0, 7) === month
      );
      setSelectProject(newSelectProject);
      // console.log("monthとskillが一致", newSelectProject);
    } else if (selectSkills.length > 0 && !month) {
      // いずれかのskillが一致した場合。完全一致ではない
      const newSelectProject = projects.filter((project) =>
        project.skill_id.some((skillId) => selectSkills.includes(skillId))
      );
      setSelectProject(newSelectProject);
      // console.log("skill絞り込みプロジェクト", newSelectProject);
    } else if (month && selectSkills.length == 0) {
      const newSelectProject = projects.filter(
        (project) => project.answer_update_at.slice(0, 7) === month
      );
      setSelectProject(newSelectProject);
      // console.log("month絞り込みプロジェクト", newSelectProject);
    } else {
      const newSelectProject = projects.filter((project) => project.id !== 0);
      setSelectProject(newSelectProject);
      // console.log("全プロジェクト", newSelectProject);
    }
  };

  return (
    <>
      <div className="flex flex-wrap justify-around">
        <section className="w-[75vw] border-2 text-center my-[5vh] py-[5vh]">
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="mb-[2vh]">
              <label htmlFor="month">回答月：</label>
              <select
                name="month"
                id="month"
                className="border-2"
                onChange={handleMonthChange}
              >
                <option value="">--</option>
                {deadlines.map((deadline) => (
                  <option value={deadline.value} key={deadline.id}>
                    {deadline.value}
                  </option>
                ))}
              </select>
            </div>
            <div className="lg:flex justify-center mb-[2vh] max-w-[55vw] ml-[10vw]">
              <legend className="lg:w-[215px] lg:h-10 lg:leading-10">
                使用技術：
              </legend>
              <fieldset id="skill" name="skill">
                {skills.map((skill) => (
                  <span key={skill.id} className="px-[10px] whitespace-nowrap">
                    <input
                      type="checkbox"
                      id={skill.skill}
                      name={skill.skill}
                      value={skill.id}
                      onChange={handleSkillChange}
                    />
                    <label htmlFor={skill.skill}>{skill.skill}</label>
                  </span>
                ))}
              </fieldset>
            </div>
            <OrangeButton label="絞り込み" type="submit" />
          </form>
        </section>
      </div>
      <div className="flex flex-col items-center h-screen ">
        <HistoryList
          month={month}
          skill={selectSkills}
          selectProject={selectProject}
        />
      </div>
    </>
  );
};

export default HistoriesPage;
