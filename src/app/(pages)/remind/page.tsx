'use client';
import Input from '@/components/ui/Input';
import OrangeButton from '@/components/ui/button/OrangeButton';
import Link from 'next/link';

const RemindPage = () => {
  const sentRemindEmail = () => {
    console.log('リマインドメールが送信されました');
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className=" text-orange text-2xl font-bold m-6">Match Face</h1>
        <span className="mb-6">
          パスワード再設定用のURLを登録のメールアドレスに送信します。
        </span>

        <form className="flex flex-col">
          <label htmlFor="email">メールアドレス</label>
          <Input id="email" className=" w-72 h-8" />
        </form>

        <div className="flex flex-col items-center">
          <OrangeButton
            label="再設定用メール送信"
            className=" w-52 mt-12"
            onClick={sentRemindEmail}
          />
          <Link href="/login" className="text-blue mt-4">
            一般ログインへ
          </Link>
        </div>
      </div>
    </>
  );
};

export default RemindPage;
