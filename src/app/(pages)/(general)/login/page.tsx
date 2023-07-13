'use client';
import Input from '@/components/ui/Input';
import OrangeButton from '@/components/ui/button/OrangeButton';
import Link from 'next/link';
import users from '@/const/login';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import SiteTitle from '@/components/ui/SiteTitle';

const get = async () => {
  const response = await fetch('http://localhost:3000/api');
  const data = await response.json();
  return {
    props: { data },
  };
};

// ダミーデータ
const correctUser = users[0];

const LoginPage = (props: any) => {
  const router = useRouter();
  const [userId, setUserId] = useState<number>();
  const [password, setPassword] = useState<string>('');
  // const [userIdError, setUserIdError] = useState<boolean>(false);
  const [userIdBlankError, setUserIdBlankError] = useState<boolean>(false);
  // const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordBlankError, setPasswordBlankError] = useState<boolean>(false);

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
    } else if (userId === correctUser.id && password === correctUser.password) {
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
              <Input
                id="userId"
                className=" w-96 h-10 mt-2"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUserId(Number(e.target.value))
                }
                value={userId}
              />
            </label>
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
              <Input
                id="password"
                className="w-96 h-10 mt-2"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                value={password}
              />
            </label>
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
