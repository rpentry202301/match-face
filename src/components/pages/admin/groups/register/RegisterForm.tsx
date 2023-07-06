import OrangeButton from "@/components/ui/button/OrangeButton";
import WhiteButton from "@/components/ui/button/WhiteButton";
import Link from "next/link";
import Input from "@/components/ui/Input";

const RegisterForm = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <form>
          <label htmlFor="group_name">▶グループ名を設定する</label>
          <Input id="group_name" />
          <br />
          <label htmlFor="user">▶ユーザーを選択する</label>
          <span>&nbsp;</span>
          <WhiteButton label="追加" className=" px-3 py-1 text-xs" />
          <Input id="user" />
          <br />
          <label htmlFor="group_description">▶備考</label>
          <Input id="group_description" />
        </form>
        <br />
        <Link href={"/admin/groups"}>
          <OrangeButton label="グループを設定する" className="py-19 text-xs" />
          {/* のちのちonclickでpostします */}
        </Link>
      </div>
    </>
  );
};

export default RegisterForm;
