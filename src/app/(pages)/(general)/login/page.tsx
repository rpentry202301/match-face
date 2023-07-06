import Input from '@/components/ui/Input';
import OrangeButton from '@/components/ui/button/OrangeButton';
import Link from 'next/link';

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className=" text-orange text-2xl font-bold">Match Face</h1>
      <label htmlFor="userId" className=" text-left">
        ユーザーID
      </label>
      <Input id="userId" className="w-72" />
      <label htmlFor="password" className="">
        パスワード
      </label>
      <Input id="password" className="w-72" />
      <OrangeButton label="ログイン" />
      <Link href="/remind" className="text-blue-500">
        パスワードを忘れた
      </Link>
      <Link href="/admin/login" className="text-blue-500">
        管理者ログイン
      </Link>
    </div>
  );
};

export default LoginPage;
