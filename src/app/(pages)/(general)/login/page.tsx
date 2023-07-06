'use client';
import Input from '@/components/ui/Input';
import OrangeButton from '@/components/ui/button/OrangeButton';
import Link from 'next/link';
import users from '@/const/login';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const router = useRouter();
  const [userId, setUserId] = useState<string>();
  const [password, setPassword] = useState<string>();

  // ダミーデータ
  const userOne = users[0];
  console.log('userOne', userOne);

  // （仮）ログイン認証チェック
  const checkLogin = () => {
    if (userId !== userOne.user_id && password === userOne.password) {
      alert('ユーザーIDが違います');
    } else if (userId === userOne.user_id && password !== userOne.password) {
      alert('パスワードが違います');
    } else if (userId !== userOne.user_id && password !== userOne.password) {
      alert('両方違います');
    } else {
      router.push('/');
    }
  };

  console.log('userId', userId);
  console.log('passWord', password);
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className=" text-orange text-2xl font-bold m-6">Match Face</h1>

        <div className="flex flex-col">
          <form className="mt-2 mb-2">
            <label htmlFor="userId" className="">
              ユーザーID
            </label>
            <Input
              id="userId"
              className="w-72"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUserId(e.target.value)
              }
            />
          </form>
          <form>
            <label htmlFor="password" className="">
              パスワード
            </label>
            <Input
              id="password"
              className="w-72"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
          </form>
        </div>

        <OrangeButton label="ログイン" className="m-4" onClick={checkLogin} />
        <Link href="/remind" className=" text-blue">
          パスワードを忘れた
        </Link>
        <Link href="/admin/login" className="text-blue pt-16">
          管理者ログイン
        </Link>
      </div>
    </>
  );
};

export default LoginPage;
