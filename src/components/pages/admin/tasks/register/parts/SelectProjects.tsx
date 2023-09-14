"use client";

import { useState } from "react";

const SelectProjects = ({ projects, activePj, onClick }: Props) => {
  const [isActive, setisActive] = useState(false);

  const selectboxStyle = isActive // セレクトボックスのスタイル
    ? "relative flex justify-between border-deep-gray border-2 text-xs cursor-pointer h-9 p-2 lg:w-96 sm:w-80 w-72 hover:border-2"
    : "relative flex justify-between border-light-gray border-2 text-xs cursor-pointer h-9 p-2 lg:w-96 sm:w-80 w-72 hover:border-2 hover:border-deep-gray";

  return (
    <div>
      <div className="flex justify-center items-center">
        <label className="text-sm">案件名：</label>
        {/* <select>は使いにくいので、<div>で代用 */}
        <div
          className={selectboxStyle}
          onClick={() => setisActive(!isActive)}
          data-testid="search-box"
        >
          <span>{activePj.name}</span>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4 text-gray-400"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </span>
        </div>
      </div>
      {isActive && (
        <div className="absolute z-50 left-[50%] translate-x-[-50%] flex flex-col bg-white border-2 w-[30rem] mt-[-2px] max-h-80 overflow-y-scroll">
          <div
            onClick={() => {
              onClick(0, "");
              setisActive(false);
            }}
            className="p-1 cursor-pointer hover:bg-orange hover:text-white"
          >
            {"　"}
          </div>
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => {
                onClick(project.id, project.name);
                setisActive(false);
              }}
              className="p-1 cursor-pointer hover:bg-orange hover:text-white"
            >
              {project.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

type Props = {
  projects: { id: number; name: string }[];
  activePj: { id: number; name: string };
  onClick: (id: number, name: string) => void;
};

export default SelectProjects;
