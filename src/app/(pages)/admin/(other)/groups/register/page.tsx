import OrangeButton from "@/components/ui/button/OrangeButton";
import WhiteButton from "@/components/ui/button/WhiteButton";
import Link from "next/link";
import Input from "@/components/ui/Input";


const GroupRegisterPage = () => {
  return (
    <>
      <div>
        <form>
          <label htmlFor="group_name">▶グループ名を設定する</label>
          <Input id="group_name"/> 
          <label htmlFor="user">▶ユーザーを選択する</label>
          <WhiteButton label="追加"/>
          <Input id="user"/>
          <label htmlFor="group_description">▶備考</label>
          <Input id="group_description"/>
        </form>
      </div>
      <br />
      <Link href={"/admin/groups"}>
        <OrangeButton label="グループを設定する" />
      </Link>
    </>
  );
};

export default GroupRegisterPage;
