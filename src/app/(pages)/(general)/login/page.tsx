import Input from '@/components/ui/Input';
import OrangeButton from '@/components/ui/button/OrangeButton';
import Link from 'next/link';

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className=" text-orange text-2xl font-bold">Match Face</h1>

      <div className="flex flex-col">
        <label htmlFor="userId" className="">
          ユーザーID
        </label>
        <Input id="userId" className="w-72" />
        <label htmlFor="password" className="">
          パスワード
        </label>
        <Input id="password" className="w-72" />
      </div>

      <OrangeButton label="ログイン" className=" m-4" />
      <Link href="/remind" className=" text-blue">
        パスワードを忘れた
      </Link>
      <Link href="/admin/login" className="text-blue">
        管理者ログイン
      </Link>
    </div>
  );
};

export default LoginPage;
