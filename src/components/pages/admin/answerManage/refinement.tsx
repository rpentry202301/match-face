"use client";
import WhiteButton from "@/components/ui/button/WhiteButton";
import WhiteCheckButton from "@/components/ui/button/WhiteCheckButton";
import OrangeButton from "@/components/ui/button/OrangeButton";
import Input from "@/components/ui/Input";
import { useState } from "react";
import { useRefine } from "@/hooks/store/context/HandleQuestionContext";

const Refinement = () => {
  const [select, setSelect] = useState<string[]>([]);
  const [refine, setRefine] = useRefine();
  const handleSelectButtonClick = (value: string) => {
    if (select.includes(value)) {
      // もしvalueが配列に既に存在していれば、削除
      setSelect(select.filter((item) => item !== value));
    } else {
      // もしvalueが配列に存在しなければ、追加
      setSelect([...select, value]);
    }
  };
  const handleCheckButtonClick = () => {
    setRefine((prevRefine) => ({
      ...prevRefine,
      department: select,
    }));
  };
  return (
    <div className="border-2 flex flex-col items-center w-5/12 max-w-5/12">
      <div className="mt-7 flex items-center w-4/5 ">
        <div className=" w-4/5">
          <Input id="search" className="w-full pl-1 border-deep-gray" />
        </div>
        <div className=" w-1/5 flex justify-end">
          <WhiteButton label="検索" className="text-xs py-1 px-5" />
        </div>
      </div>
      <div className="mt-7 flex w-4/5 justify-between">
        <WhiteButton
          label="Java"
          className={
            select.includes("Java")
              ? "text-xs py-1 px-5 bg-gray-200 translate-y-0.5 shadow-sm rounded-full border"
              : "text-xs py-1 px-5"
          }
          value="Java"
          data-testid='button-Java'
          onClick={() => handleSelectButtonClick("Java")}
        />
        <WhiteButton
          label="PHP"
          className={
            select.includes("PHP")
              ? "text-xs py-1 px-5 bg-gray-200 translate-y-0.5 shadow-sm rounded-full border"
              : "text-xs py-1 px-5"
          }
          value="PHP"
          onClick={() => handleSelectButtonClick("PHP")}
        />
        <WhiteButton
          label="FR"
          className={
            select.includes("FR")
              ? "text-xs py-1 px-5 bg-gray-200 translate-y-0.5 shadow-sm rounded-full border"
              : "text-xs py-1 px-5"
          }
          value="FR"
          onClick={() => handleSelectButtonClick("FR")}
        />
        <WhiteButton
          label="CL"
          className={
            select.includes("CL")
              ? "text-xs py-1 px-5 bg-gray-200 translate-y-0.5 shadow-sm rounded-full border"
              : "text-xs py-1 px-5"
          }
          value="CL"
          onClick={() => handleSelectButtonClick("CL")}
        />
        <WhiteButton
          label="ML"
          className={
            select.includes("ML")
              ? "text-xs py-1 px-5 bg-gray-200 translate-y-0.5 shadow-sm rounded-full border"
              : "text-xs py-1 px-5"
          }
          value="ML"
          onClick={() => handleSelectButtonClick("ML")}
        />
        <WhiteButton
          label="QA"
          className={
            select.includes("QA")
              ? "text-xs py-1 px-5 bg-gray-200 translate-y-0.5 shadow-sm rounded-full border"
              : "text-xs py-1 px-5"
          }
          value="QA"
          onClick={() => handleSelectButtonClick("QA")}
        />
      </div>
      <OrangeButton
        label="絞り込み"
        className="rounded-none text-xs py-1 px-5 w-auto my-7 active:rounded-none active:text-xs active:py-1 active:px-5 active:w-auto active:my-7"
        onClick={() => {
          handleCheckButtonClick();
        }}
        data-testid='button-refine'
      />
    </div>
  );
};

export default Refinement;
