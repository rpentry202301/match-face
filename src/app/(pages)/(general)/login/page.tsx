'use client';
import Input from '@/components/ui/Input';
import OrangeButton from '@/components/ui/button/OrangeButton';
import Link from 'next/link';
import users from '@/const/login';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import SiteTitle from '@/components/ui/SiteTitle';

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
  const checkLogin = (event: FormEvent) => {
    event.preventDefault();
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
      <form onSubmit={checkLogin}>
        <div className="flex flex-col items-center justify-center h-screen">
          <SiteTitle className="m-6" />
          <div className="mt-2 mb-2">
            <label htmlFor="userId" className="">
              ユーザーID
            </label>
            <Input
              id="userId"
              className=" w-96 h-8 mt-2"
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
          </div>
          <div>
            <label htmlFor="password" className="">
              パスワード
            </label>
            <Input
              id="password"
              className="w-96 h-8 mt-2"
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
          </div>

          <OrangeButton
            label="ログイン"
            className="mt-10 mb-4 w-48 rounded-none"
            type="submit"
          />
          <Link href="/remind" className=" text-blue">
            パスワードを忘れた
          </Link>
          <Link href="/admin/login" className="text-blue pt-16">
            管理者ログイン
          </Link>
        </div>
      </form>
    </>
  );
};

export default LoginPage;
