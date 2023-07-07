import Input from "@/components/ui/Input";
import WhiteButton from "@/components/ui/button/WhiteButton";

const SelectUsers = () => {
  return (
    <div>
      <div className="flex items-center">
        <p>ユーザーを選択する</p>
        <WhiteButton label="追加" className="text-xs" />
      </div>
      <div>
        <Input
          id="search"
          className="border-2 border-light-gray text-xs p-1 w-96"
          readOnly
        />
      </div>
    </div>
  );
};

export default SelectUsers;
