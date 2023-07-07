'use client';
import SelectBox from "@/components/ui/selectbox/SelectBox";
import getThis_NextYear from "@/lib/common/date/getThis_NextYear";

const SelectDeadline = () => {
  return (
    <div>
      <div className="flex items-center">
        <div>
          <p>締め切り日時を設定する</p>
        </div>
        <div>
          <SelectBox className="w-20 h-6 text-sm" optionVal={getThis_NextYear()}/>
        </div>
      </div>
    </div>
  );
};

export default SelectDeadline;

// 削除予定
const hoge = Array(20).fill(10);
