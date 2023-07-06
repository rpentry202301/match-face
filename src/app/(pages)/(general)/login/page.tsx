import Input from '@/components/ui/Input';
import OrangeButton from '@/components/ui/button/OrangeButton';
import Link from 'next/link';

const LoginPage = () => {
  return (
    <div className="flex flex-col">
      <h1 className=" text-orange font-normal">Match Face</h1>
      <label htmlFor="userId" className="">
        ユーザーID
      </label>
      <Input id="userId" />
      <label htmlFor="password" className="">
        パスワード
      </label>
      <Input id="password" />
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
