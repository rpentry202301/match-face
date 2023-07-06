'use client';
import Input from '@/components/ui/Input';
import OrangeButton from '@/components/ui/button/OrangeButton';
import users from '@/const/login';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const AdminLoginPage = () => {
  const router = useRouter();
  const [userId, setUserId] = useState<string>();
  const [password, setPassword] = useState<string>();

  // ダミーデータ
  const adminUser = users[2];
  console.log('adminUser', adminUser);

  // （仮）ログイン認証チェック
  const checkLogin = () => {
    if (userId !== adminUser.user_id && password === adminUser.password) {
      alert('ユーザーIDが違います');
    } else if (
      userId === adminUser.user_id &&
      password !== adminUser.password
    ) {
      alert('パスワードが違います');
    } else if (
      userId !== adminUser.user_id &&
      password !== adminUser.password
    ) {
      alert('両方違います');
    } else {
      router.push('/admin');
    }
  };

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
      <Link href="/login" className="text-blue pt-16">
        一般ログイン
      </Link>
    </div>
  );
};

export default AdminLoginPage;
