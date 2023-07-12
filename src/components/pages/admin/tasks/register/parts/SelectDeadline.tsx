"use client";
import SelectBox from "@/components/ui/selectbox/SelectBox";
import getThis_NextYear from "@/lib/common/date/getThis_NextYear";
import { monthArr, timeArr } from "@/lib/common/date/date";
import { useState } from "react";
import getDayArrInMonth from "@/lib/common/date/getDayArrInMonth";

const SelectDeadline = () => {
  const [date, setDate] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: 1,
    time: 18,
  });
  return (
    <div>
      <div className="flex items-center">
        <div>
          <p className="text-base w-40">▶締切日時を設定する</p>
        </div>
        <div className="flex items-center ml-10">
          <div className="flex items-center">
            <SelectBox
              id="year"
              data-testid="year"
              name="year"
              className="w-20 h-6 text-sm"
              optionVal={getThis_NextYear()}
              value={date.year}
              onChange={(e) =>
                setDate({ ...date, year: Number(e.target.value) })
              }
            />
            <p className="text-ms ml-0.5">年</p>
          </div>
          <div className="flex items-center ml-4">
            <SelectBox
              id="month"
              data-testid="month"
              name="month"
              className="w-20 h-6 text-sm"
              optionVal={monthArr}
              value={date.month}
              onChange={(e) =>
                setDate({ ...date, month: Number(e.target.value) })
              }
            />
            <p className="text-ms ml-0.5">月</p>
          </div>
          <div className="flex items-center ml-4">
            <SelectBox
              id="day"
              name="day"
              data-testid="day"
              className="w-20 h-6 text-sm"
              optionVal={getDayArrInMonth(date.year, date.month)}
              value={date.day}
              onChange={(e) =>
                setDate({ ...date, day: Number(e.target.value) })
              }
            />
            <p className="text-ms ml-0.5">日</p>
          </div>
          <div className="flex items-center ml-4">
            <SelectBox
              id="time"
              data-testid="time"
              name="time"
              className="w-20 h-6 text-sm"
              optionVal={timeArr()}
              value={date.time}
              onChange={(e) =>
                setDate({ ...date, time: Number(e.target.value) })
              }
            />
            <p className="text-ms ml-0.5">時</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectDeadline;

// 削除予定
const hoge = Array(20).fill(10);
