"use client";
import Input from "@/components/ui/Input";
import OrangeButton from "@/components/ui/button/OrangeButton";
import WhiteCheckButton from "@/components/ui/button/WhiteCheckButton";
import { SyntheticEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Departments } from "@/types/admin/tasks/types";

/**
 * @author Hayato Kobayashi
 * @todo_1 レスポンシブ対応
 */
const SearchByJobs = ({ departments }: Props) => {
  const [jobsFilter, setJobsFilter] = useState<number[]>([]); // 職種フィルター状態管理
  const [inputVal, setInputVal] = useState<string>(""); // 検索入力値状態管理

  const router = useRouter();

  // 検索条件に設定するクエリ
  const query = useMemo(() => {
    if (jobsFilter.length === 0 && inputVal.length === 0) return "";

    /**
     * ワード検索クエリ
     * ex) "a b c" → "searchKeyword=a&searchKeyword=b&searchKeyword=c"
     */
    const searchKeyword =
      inputVal.length !== 0
        ? inputVal // ex)"a b c" → "a_b_c"
            .split(/[\s]+/)
            .filter((word) => word.length !== 0)
            .map((word, i) => {
              if (i === 0) return `searchKeyword=${word}`;
              return `&searchKeyword=${word}`;
            })
            .join("")
        : "";
    /**
     * 職種フィルター検索クエリ
     * ex) [1, 2, 3] → "departmentId=1&departmentId=2&departmentId=3"
     * @note searchKeywordがある場合は先頭に"&"がつく
     */
    const departmentId =
      jobsFilter.length !== 0
        ? jobsFilter
            .map((job, i) => {
              if (i === 0) return `${searchKeyword && "&"}departmentId=${job}`;
              return `&departmentId=${job}`;
            })
            .join("")
        : "";

    const searchQuery = searchKeyword + departmentId;
    return searchQuery;
  }, [jobsFilter, inputVal]);

  // 検索入力値を適用
  const handleSearch = (e: SyntheticEvent) => {
    e.preventDefault();
    router.push(`/admin/tasks${query && "?" + query}`);
  };

  const handleSetFilter = (departmentId: number) => {
    // 職種レコードを挿入
    if (!jobsFilter.includes(departmentId)) {
      const newArr = [...jobsFilter];
      newArr.push(departmentId);
      setJobsFilter(newArr);
    } else {
      // 職種レコードを削除
      const newArr = jobsFilter.filter((job) => {
        return job !== departmentId;
      });
      setJobsFilter(newArr);
    }
  };

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
                onClick={() => handleSetFilter(department.id)}
                data-testid={`btn_${department.name}`}
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

type Props = {
  departments: Departments[];
};

export default SearchByJobs;
