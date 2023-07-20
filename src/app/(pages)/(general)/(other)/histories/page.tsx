"use client";

import HistoryList from "@/components/pages/general/histories/HistoryList";
import OrangeButton from "@/components/ui/button/OrangeButton";
import { skills } from "@/const/histories";
import { useState } from "react";

// ここでuseStateで絞り込み条件データを保持,Listに値を渡してListコンポで絞り込み
// または、このpageから selectコンポへ関数呼び出し、 selectで値を確定してpageのuseStateを変更、Listへ渡す
const HistoriesPage = () => {
  const [month, setMonth] = useState("");
  const [selectSkills, setSelectSkills] = useState([]);

  const deadlines = [
    { id: 1, value: "2023-07" },
    { id: 2, value: "2023-07" },
    { id: 3, value: "2023-03" },
  ];

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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(month, selectSkills);
  };
  return (
    <>
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
            onChange={(e) => setMonth(e.target.value)}
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
      <div className="flex flex-col items-center h-screen ">
        <HistoryList month={month} skill={selectSkills} />
      </div>
    </>
  );
};

export default HistoriesPage;
