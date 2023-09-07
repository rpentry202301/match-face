"use client";

import HistoryList from "@/components/pages/general/histories/HistoryList";
import OrangeButton from "@/components/ui/button/OrangeButton";
import React, { Suspense, useEffect } from "react";
import { useState } from "react";
import Loading from "@/components/elements/loading/Loading";

type SkillType = {
  id: number;
  name: string;
  createdUser: string;
  createdAt: string;
  updateUser: string;
  updateAt: string;
}[];

const HistoriesPage = () => {
  const [month, setMonth] = useState("");
  const [selectSkills, setSelectSkills] = useState<number[]>([]);

  const [skillList, setSkillList] = useState<SkillType>([]);
  const [isClick, setIsClick] = useState(false);

  useEffect(() => {
    async function getData() {
      const response = await fetch(
        "http://localhost:3000/api/histories/skills",
        {
          cache: "no-store",
          method: "GET",
        }
      );
      if (!response.ok) throw new Error("Failed to fetch data");
      const tmpSkills = await response.json();
      const skillList = tmpSkills.skillList;
      setSkillList(skillList);
    }
    getData();
  }, []);

  const deadlines = [
    { id: 1, value: "2023-01-01" },
    { id: 2, value: "2023-02-01" },
    { id: 3, value: "2023-03-01" },
    { id: 4, value: "2023-04-01" },
    { id: 5, value: "2023-05-01" },
    { id: 6, value: "2023-06-01" },
    { id: 7, value: "2023-07-01" },
    { id: 8, value: "2023-08-01" },
    { id: 9, value: "2023-09-01" },
    { id: 10, value: "2023-10-01" },
    { id: 11, value: "2023-11-01" },
    { id: 12, value: "2023-12-01" },
  ];

  // Month選択
  const handleMonthChange = (e: any) => {
    setMonth(e.target.value);
  };

  // skill選択
  const handleSkillChange = (e: any) => {
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

  const handleClick = () => {
    setIsClick(!isClick);
    console.log(isClick);
  };

  return (
    <>
      <Suspense fallback={<Loading />}>
        <div className="flex flex-wrap justify-around">
          <section className="w-[75vw] border-2 text-center my-[5vh] py-[5vh]">
            <div>
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
                  {skillList.map((skill) => (
                    <span
                      key={skill.id}
                      className="px-[10px] whitespace-nowrap"
                    >
                      <input
                        type="checkbox"
                        id={skill.name}
                        name={skill.name}
                        value={skill.id}
                        onChange={handleSkillChange}
                      />
                      <label htmlFor={skill.name}>{skill.name}</label>
                    </span>
                  ))}
                </fieldset>
              </div>
              <OrangeButton
                label="絞り込み"
                type="submit"
                onClick={() => handleClick()}
              />
            </div>
          </section>
        </div>
        <div className="flex flex-col items-center h-screen ">
          <HistoryList click={isClick} month={month} skill={selectSkills} />
        </div>
      </Suspense>
    </>
  );
};

export default HistoriesPage;
