'use client';
import Input from '@/components/ui/Input';
import SiteTitle from '@/components/ui/SiteTitle';
import OrangeButton from '@/components/ui/button/OrangeButton';
import users from '@/const/login';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

// ダミーデータ
const adminCorrectUser = users[2];

const AdminLoginPage = () => {
  const router = useRouter();
  const [userId, setUserId] = useState<string>('');
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
    } else if (
      Number(userId) === adminCorrectUser.id &&
      password === adminCorrectUser.password
    ) {
      router.push('/admin');
    }
  };

  return (
    <>
      <form onSubmit={checkLogin}>
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="flex flex-col items-center m-3">
            <SiteTitle className="m-3" />
            <h2>管理者用ログイン</h2>
          </div>

          <div className="mt-2 mb-2">
            <label htmlFor="userId" className="">
              ユーザーID
            </label>
            <Input
              id="userId"
              className="w-96 h-10 mt-2"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUserId(e.target.value)
              }
            />
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
              className="w-96 h-10 mt-2"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
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
          <Link href="/login" className="text-blue pt-16">
            一般ログイン
          </Link>
        </div>
      </form>
    </>
  );
};

export default AdminLoginPage;
