import UserSelectModal from "../UserSelectModal";
import UserInput from "./UserInput ";

const SelectUsers = async () => {
  return (
    <div className="mb-5">
      <div className="flex items-center mb-2">
        <p className="text-base w-40">▶ユーザーを選択する</p>
        <div className="text-xs ml-10">
          <UserSelectModal />
        </div>
      </div>
      <div>
        <UserInput />
      </div>
    </div>
  );
};

export default SelectUsers;
