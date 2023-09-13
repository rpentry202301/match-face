"use client";
import Input from "@/components/ui/Input";
import { useUserSelect } from "@/hooks/store/context/UserSelectContext";

const UserInput = () => {
  const [userSelect] = useUserSelect();
  const users = userSelect
    .map((user) => user.name)
    .reduce((cur, user) => cur + ", " + user, "")
    .slice(2);
  return (
    <Input
      id="search"
      className="border-2 border-light-gray text-xs p-1 w-full"
      value={users}
      readOnly
    />
  );
};

export default UserInput;
