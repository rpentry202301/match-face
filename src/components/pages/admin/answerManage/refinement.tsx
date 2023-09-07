"use client";
import WhiteButton from "@/components/ui/button/WhiteButton";
import WhiteCheckButton from "@/components/ui/button/WhiteCheckButton";
import OrangeButton from "@/components/ui/button/OrangeButton";
import Input from "@/components/ui/Input";
import { useState, ChangeEvent, useEffect } from "react";
import { useRefine } from "@/hooks/store/context/HandleQuestionContext";

type Department = {
  id: number;
  name: string;
  createdUser: string;
  createdAt: string;
  updateUser: string;
  updateAt: string;
};

type DepartmentResponse = {
  departmentList: Department[];
};

const Refinement = () => {
  const [select, setSelect] = useState<number[]>([]);
  const [search, setSearch] = useState<string[]>([]);
  const [department, setDepartment] = useState<Department[]>([]);
  const [refine, setRefine] = useRefine();

  useEffect(() => {
    async function setData(){
      const response_departments = await fetch('http://localhost:3000/api/admin/histories/departments')
      if (!response_departments.ok){ throw new Error('Failed to fetch data');}
      const department = await response_departments.json()
      setDepartment(department)
  }
  setData()
    // fetch("http://localhost:8080/qa_system_api/departments")
    //   .then((response) => {
    //     if (!response.ok) {
    //       // console.log("error");
    //       setDepartment([]);
    //     }
    //     return response.json();
    //   })
    //   .then((res: DepartmentResponse) => {
    //     // console.log(res);
    //     setDepartment(res.departmentList);
    //   })
    //   .catch((error) => {
    //     // console.log("error");
    //     setDepartment([]);
    //   });
  }, []);

  const handleSelectButtonClick = (value: number) => {
    if (select.includes(value)) {
      // もしvalueが配列に既に存在していれば、削除
      setSelect(select.filter((item) => item !== value));
    } else {
      // もしvalueが配列に存在しなければ、追加
      setSelect([...select, value]);
    }
  };
  const handleInputSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.split(/[\s]+/));
  };
  const handleCheckButtonClick = () => {
    setRefine((prevRefine) => ({
      ...prevRefine,
      word: search,
      department: select,
    }));
  };
  return (
    <div className="border-2 flex flex-col items-center w-5/12 max-w-5/12">
      <div className="mt-7 flex items-center w-4/5 ">
        <div className=" w-4/5">
          <Input
            id="search"
            className="w-full pl-1 border-deep-gray"
            onChange={(e) => handleInputSearch(e)}
            data-testid="input-search"
          />
        </div>
        <div className=" w-1/5 flex justify-end">
          <WhiteButton
            label="検索"
            className="text-xs py-1 px-5"
            onClick={() => {
              handleCheckButtonClick();
            }}
            data-testid="button-search"
          />
        </div>
      </div>
      <div className="mt-7 flex w-4/5 justify-between">
        {department.map((data) => {
          return (
              <WhiteButton
                key={data.id}
                label={data.name}
                className={
                  select.includes(data.id)
                    ? "text-xs py-1 px-5 bg-gray-200 translate-y-0.5 shadow-sm rounded-full border"
                    : "text-xs py-1 px-5"
                }
                value={data.id}
                data-testid={`button-${data.name}`}
                onClick={() => handleSelectButtonClick(data.id)}
              />
          );
        })}
      </div>
      <OrangeButton
        label="絞り込み"
        className="rounded-none text-xs py-1 px-5 w-auto my-7 active:rounded-none active:text-xs active:py-1 active:px-5 active:w-auto active:my-7"
        onClick={() => {
          handleCheckButtonClick();
        }}
        data-testid="button-refine"
      />
    </div>
  );
};

export default Refinement;
