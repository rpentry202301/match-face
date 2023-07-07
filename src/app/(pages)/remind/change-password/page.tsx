'use client';
import Input from '@/components/ui/Input';
import OrangeButton from '@/components/ui/button/OrangeButton';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

const ChangePasswordPage = () => {
  const router = useRouter();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();
  // const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordBlankError, setPasswordBlankError] = useState<boolean>(false);

  // （仮）登録認証ボタン
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    alert('変更完了');
    router.push('/login');
  };

  return (
    <form
      className="flex flex-col items-center justify-center h-screen"
      onSubmit={handleSubmit}
    >
      <h1 className=" text-orange text-2xl font-bold m-4">Match Face</h1>

      <div className="mt-2 mb-2">
        <label htmlFor="newPassword" className="">
          新しいパスワード
        </label>
        <Input
          id="newPassword"
          className="w-72 h-8"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
      </div>
      <div>
        <label htmlFor="confirmPassword" className="">
          新しいパスワード（確認用）
        </label>
        <Input
          id="confirmPassword"
          className="w-72 h-8"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setConfirmPassword(e.target.value)
          }
        />
      </div>
      <OrangeButton label="登録" className="m-12" />
      <Link href="/login">（移動用、削除要）ログインへ</Link>
    </form>
  );
};

export default ChangePasswordPage;
