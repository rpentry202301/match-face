import Input from '@/components/ui/Input';
import OrangeButton from '@/components/ui/button/OrangeButton';
import Link from 'next/link';

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className=" text-orange text-2xl font-bold m-6">Match Face</h1>

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
      <Link href="/admin/login" className="text-blue pt-16">
        管理者ログイン
      </Link>
    </div>
  );
};

export default LoginPage;
