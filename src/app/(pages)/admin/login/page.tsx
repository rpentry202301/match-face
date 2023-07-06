import Input from '@/components/ui/Input';
import OrangeButton from '@/components/ui/button/OrangeButton';
import Link from 'next/link';

const AdminLoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center m-6">
        <h1 className=" text-orange text-2xl font-bold">Match Face</h1>
        <h2>管理者用ログイン</h2>
      </div>

      <div className="flex flex-col">
        <form className="mt-2 mb-2">
          <label htmlFor="userId" className="">
            ユーザーID
          </label>
          <Input id="userId" className="w-72" />
        </form>
        <form>
          <label htmlFor="password" className="">
            パスワード
          </label>
          <Input id="password" className="w-72" />
        </form>
      </div>

      <OrangeButton label="ログイン" className="m-4" />
      <Link href="/remind" className=" text-blue">
        パスワードを忘れた
      </Link>
      <Link href="/login" className="text-blue pt-16">
        一般ログイン
      </Link>
    </div>
  );
};

export default AdminLoginPage;
