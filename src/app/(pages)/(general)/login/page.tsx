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
  // const [userIdError, setUserIdError] = useState<boolean>(false);
  const [userIdBlankError, setUserIdBlankError] = useState<boolean>(false);
  // const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordBlankError, setPasswordBlankError] = useState<boolean>(false);

  // ダミーデータ
  const correctUser = users[0];
  // console.log('crrectUser', correctUser);

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
      userId === correctUser.user_id &&
      password === correctUser.password
    ) {
      router.push('/');
    }
  };
  // console.log('typeof userId', typeof userId);
  // console.log('passWord', typeof password);
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
              className="w-72 h-8"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUserId(e.target.value)
              }
            />
            {/* {userIdError && (
              <p className="text-red">※ユーザーIDに誤りがあります</p>
            )} */}
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
            {/* {passwordError && (
              <p className="text-red">※パスワードに誤りがあります。</p>
            )} */}
            {passwordBlankError && (
              <p className="text-red">※パスワードを入力してください</p>
            )}
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
