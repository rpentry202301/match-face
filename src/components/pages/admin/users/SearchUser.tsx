"use client";

import Input from "@/components/ui/Input";
import WhiteButton from "@/components/ui/button/WhiteButton";
import { department } from "@/const/userList";
import { entry_status } from "@/const/userList";

const SearchUser = () => {
  return (
    <div className="flex justify-center">
      <div className="border border-deep-gray w-max my-10">
        <div className="flex my-5">
          <Input id="1" className=" w-80 mx-5" />
          <WhiteButton label="検索" className="w-20 py-0.5" />
        </div>
        <div>{/* セレクトボックス入れる */}</div>

        <div className="my-5">
          {department.map((department, id) => (
            <WhiteButton
              key={id}
              label={department.department}
              className="w-20 mx-5 py-0.5"
            />
          ))}
        </div>
        <div className="mx-5 my-5">
          {entry_status.map((status, id) => (
            <WhiteButton
              key={id}
              label={status.status}
              className=" w-32 mr-5 py-0.5"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchUser;
