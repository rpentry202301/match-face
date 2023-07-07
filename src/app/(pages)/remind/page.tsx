'use client';
import Input from '@/components/ui/Input';
import OrangeButton from '@/components/ui/button/OrangeButton';
import Link from 'next/link';
import { useState } from 'react';

const RemindPage = () => {
  const [email, setEmail] = useState<string>();
  const [emailBlankError, setEmailBlankError] = useState<boolean>(false);

  // （仮）リマインドメール送信
  const sentRemindEmail = (event: any) => {
    event.preventDefault();
    if (!email) {
      setEmailBlankError(true);
    } else if (email) {
      setEmailBlankError(false);
      alert('リマインドメールが送信されました');
    }
  };

  return (
    <>
      <form onSubmit={sentRemindEmail}>
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className=" text-orange text-2xl font-bold m-6">Match Face</h1>
          <span className="mb-6">
            パスワード再設定用のURLを登録のメールアドレスに送信します。
          </span>

          <div className="">
            <label htmlFor="email">メールアドレス</label>
            <Input
              id="email"
              className=" w-72 h-8"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
            {emailBlankError && (
              <p className="text-red">※メールアドレスを入力してください</p>
            )}
          </div>
          <OrangeButton
            label="再設定用メール送信"
            className=" w-52 mt-12"
            type="submit"
          />
          <Link href="/login" className="text-blue mt-4">
            一般ログインへ
          </Link>
        </div>
      </form>
    </>
  );
};

export default RemindPage;
