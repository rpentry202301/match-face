"use client";
import Input from "@/components/ui/Input";
import OrangeButton from "@/components/ui/button/OrangeButton";
import WhiteCheckButton from "@/components/ui/button/WhiteCheckButton";
import { SyntheticEvent, useMemo, useState } from "react";

// 削除予定
import { departments } from "@/const/tasks";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SearchByJobs = () => {
  const [jobsFilter, setJobsFilter] = useState<string[]>([]); // 職種フィルター状態管理
  const [inputVal, setInputVal] = useState<string>(""); // 検索入力値状態管理

  const router = useRouter();

  // 検索条件をクエリに設定
  const query = useMemo(() => {
    if (jobsFilter.length === 0 && inputVal.length === 0) return "";

    const searchKeyword =
      inputVal.length !== 0
        ? `searchKeyword=${inputVal // ex)"a b c" → "a_b_c"
            .split(/[\s]+/)
            .filter((word) => word.length !== 0)
            .join("_")}`
        : "";

    const departmentId =
      jobsFilter.length !== 0
        ? `${searchKeyword && "&"}departmentId=${jobsFilter.join("_")}`
        : "";

    const searchQuery = `?${searchKeyword && searchKeyword}${departmentId}`;
    return searchQuery;
  }, [jobsFilter, inputVal]);

  // 検索入力値を適用
  const handleSearch = (e: SyntheticEvent) => {
    e.preventDefault();
    router.push(`/admin/tasks${query}`);
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

  // 検索条件を含めたクエリを生成

  return (
    <div className="border-2 rounded-md w-3/6 mx-auto mt-6 p-3">
      {/* 職種フィルター入力欄 */}
      <div className="w-full mb-4">
        <div className="mb-2">
          <h2 className="text-base ml-3">▶️募集職種で検索</h2>
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
      </div>

      {/* 案件名/ユーザー名検索欄 */}
      <div className="w-full">
        <div className="mb-2">
          <h2 className="text-base ml-3">▶️案件名/ユーザー名で検索</h2>
        </div>
        <form onSubmit={handleSearch} className="flex flex-col items-center">
          <Input
            id="search"
            className="border-light-gray text-xs p-1 w-[35rem]"
            onChange={(e) => setInputVal(e.target.value)}
            data-testid="search-box"
          />
          <OrangeButton
            label="検索"
            className="w-20 text-sm mt-2"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default SearchByJobs;
