import OrangeButton from "@/components/ui/button/OrangeButton";
import Link from "next/link";

const GroupRegisterPage = () => {
  return (
    <>
      <div>グループ設定画面</div>
      <Link href={"/admin/groups"}>
        <OrangeButton label="グループを設定する" />
      </Link>
    </>
  );
};

export default GroupRegisterPage;
