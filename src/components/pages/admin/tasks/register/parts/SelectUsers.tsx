import Input from "@/components/ui/Input";
import UserSelectModal from "../UserSelectModal";
import UserInput from "./UserInput ";

const SelectUsers = () => {
  return (
    <div className="mb-5">
      <div className="flex items-center mb-2">
        <p className="text-base w-40">▶ユーザーを選択する</p>
        <div className="text-xs ml-10">
          <UserSelectModal />
        </div>
      </div>
      <div>
        {/* Todo: 別コンポーネントに<Input/>を渡す("use clent"使用のため) */}
        {/* <Input
          id="search"
          className="border-2 border-light-gray text-xs p-1 w-full"
          readOnly
        /> */}
        <UserInput />
      </div>
    </div>
  );
};

export default SelectUsers;
