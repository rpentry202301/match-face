"use client";
import SelectBox from "@/components/ui/selectbox/SelectBox";
import {
  monthArr,
  timeArr,
  getDayArrInMonth,
  getThis_NextYear,
} from "@/lib/common/date/date";
import { ChangeEvent } from "react";

const SelectDeadline = ({ state, handleChange }: Props) => {
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
              value={state.year}
              onChange={handleChange}
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
              value={state.month}
              onChange={handleChange}
            />
            <p className="text-ms ml-0.5">月</p>
          </div>
          <div className="flex items-center ml-4">
            <SelectBox
              id="day"
              name="day"
              data-testid="day"
              className="w-20 h-6 text-sm"
              optionVal={getDayArrInMonth(state.year, state.month)}
              value={state.day}
              onChange={handleChange}
            />
            <p className="text-ms ml-0.5">日</p>
          </div>
          <div className="flex items-center ml-4">
            <SelectBox
              id="hour"
              data-testid="hour"
              name="hour"
              className="w-20 h-6 text-sm"
              optionVal={timeArr()}
              value={state.hour}
              onChange={handleChange}
            />
            <p className="text-ms ml-0.5">時</p>
          </div>
        </div>
      </div>
    </div>
  );
};

type Props = {
  state: {
    year: string;
    month: string;
    day: string;
    hour: string;
  };
  handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

export default SelectDeadline;
