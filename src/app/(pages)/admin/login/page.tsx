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
  // const [userIdError, setUserIdError] = useState<boolean>(false);
  const [userIdBlankError, setUserIdBlankError] = useState<boolean>(false);
  // const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordBlankError, setPasswordBlankError] = useState<boolean>(false);

  // ダミーデータ
  const adminCorrectUser = users[2];
  // console.log('adminCorrectUser', adminCorrectUser);

  // todo:（仮）ログイン認証チェック(入力欄がブランクの時のみエラー感知)
  const checkLogin = () => {
    if (!userId && !password) {
      setUserIdBlankError(true);
      setPasswordBlankError(true);
    } else if (!userId && password) {
      setUserIdBlankError(true);
      setPasswordBlankError(false);
    } else if (userId && !password) {
      setUserIdBlankError(false);
      setPasswordBlankError(true);
    } else if (
      userId === adminCorrectUser.user_id &&
      password === adminCorrectUser.password
    ) {
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
            className="w-72 h-8"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUserId(e.target.value)
            }
          />
          {userIdBlankError && (
            <p className="text-red">※ユーザーIDを入力してください</p>
          )}
        </form>
        <form>
          <label htmlFor="password" className="">
            パスワード
          </label>
          <Input
            id="password"
            className="w-72 h-8"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
          {passwordBlankError && (
            <p className="text-red">※パスワードを入力してください</p>
          )}
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
