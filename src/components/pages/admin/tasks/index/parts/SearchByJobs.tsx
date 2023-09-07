"use client";
import Input from "@/components/ui/Input";
import OrangeButton from "@/components/ui/button/OrangeButton";
import WhiteButton from "@/components/ui/button/WhiteButton";
import WhiteCheckButton from "@/components/ui/button/WhiteCheckButton";
import { SyntheticEvent, useState } from "react";

// 削除予定
import { departments } from "@/const/tasks";
import Link from "next/link";

const SearchByJobs = () => {
  // 職種フィルター状態管理
  const [jobsFilter, setJobsFilter] = useState<string[]>([]);
  // 検索入力値状態管理
  const [inputVal, setInputVal] = useState<string>("");

  const handleSearch = (e: SyntheticEvent) => {
    e.preventDefault();
    if (inputVal.length === 0) {
      return;
    }
    const wordList = inputVal
      .split(/[\s]+/)
      .filter((word) => word.length !== 0);
  };

  const handleSetFilter = (department: string) => {
    // 職種レコードを挿入
    if (!jobsFilter.includes(department)) {
      const newArr = [...jobsFilter];
      newArr.push(department);
      setJobsFilter(newArr);
    } else {
      // 職種レコードを削除
      const newArr = jobsFilter.filter((job) => {
        return job !== department;
      });
      setJobsFilter(newArr);
    }
    // console.log("jobsFilter2", jobsFilter);
  };

  return (
    <div className="border-2 rounded-md w-3/6 mx-auto mt-6 p-3">
      {/* 案件名/ユーザー名検索欄 */}
      <div className="w-full">
        <div className="mb-2">
          <h2 className="text-base ml-3">▶️案件名/ユーザー名で絞り込み</h2>
        </div>
        <form onSubmit={handleSearch} className="flex flex-col items-center mb-4">
          <Input
            id="search"
            className="border-light-gray text-xs p-1 w-[35rem]"
            onChange={(e) => setInputVal(e.target.value)}
            data-testid="search-box"
          />
          <Link href={`/admin/tasks`} className="mt-2">
            <OrangeButton label="検索" className="w-20 text-sm" />
          </Link>
        </form>
      </div>

      {/* 職種フィルター入力欄 */}
      <div className="w-full">
        <div className="mb-2">
          <h2 className="text-base ml-3">▶️募集職種で絞り込み</h2>
        </div>
        <div className="flex justify-center">
          {departments.map((department) => {
            return (
              <WhiteCheckButton
                key={department.id}
                label={department.name}
                className="text-xs w-16 mx-3"
                onClick={() => handleSetFilter(department.name)}
              />
            );
          })}
        </div>
        <div className="flex justify-center">
          <Link href={`/admin/tasks`} className="mt-3">
            <OrangeButton label="絞り込み" className="w-20 text-sm" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchByJobs;
