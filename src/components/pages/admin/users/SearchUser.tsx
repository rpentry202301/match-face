import Input from "@/components/ui/Input";
import WhiteButton from "@/components/ui/button/WhiteButton";
import { department } from "@/const/department";
import { entry_status } from "@/const/department";

const SearchUser = () => {
  const btnStyle = "";
  return (
    <div className=" border my-10">
      <div className="flex my-5">
        <Input id="1" className=" mr-5" />
        <WhiteButton label="検索" className="" />
      </div>
      <div>{/* セレクトボックス入れる */}</div>

      <div className="my-5">
        {department.map((department, id) => (
          <WhiteButton key={id} label={department.department} className=""/>
        ))}
      </div>
      <div className="my-5">
        {entry_status.map((status, id) => (
          <WhiteButton key={id} label={status.status} />
        ))}
      </div>
    </div>
  );
};

export default SearchUser;
