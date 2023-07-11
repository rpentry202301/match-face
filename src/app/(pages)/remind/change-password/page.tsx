'use client';
import Input from '@/components/ui/Input';
import SiteTitle from '@/components/ui/SiteTitle';
import OrangeButton from '@/components/ui/button/OrangeButton';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

const ChangePasswordPage = () => {
  const router = useRouter();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();
  // const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordBlankError, setPasswordBlankError] = useState<boolean>(false);
  const [confirmPasswordBlankError, setConfirmPasswordBlankError] =
    useState<boolean>(false);

  // （仮）登録認証ボタン
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!password && !confirmPassword) {
      setPasswordBlankError(true);
      setConfirmPasswordBlankError(true);
    } else if (password && !confirmPassword) {
      setPasswordBlankError(false);
      setConfirmPasswordBlankError(true);
    } else if (!password && confirmPassword) {
      setPasswordBlankError(true);
      setConfirmPasswordBlankError(false);
    } else if (password && confirmPassword) {
      alert('変更完了');
      router.push('/login');
    }
  };

  return (
    <form
      className="flex flex-col items-center justify-center h-screen"
      onSubmit={handleSubmit}
    >
      <SiteTitle className="m-8" />
      <div className="mt-2 mb-2">
        <label htmlFor="newPassword" className="">
          新しいパスワード
        </label>
        <Input
          id="newPassword"
          className="w-96 h-10 mt-2"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        {passwordBlankError && (
          <p className="text-red">※新しいパスワードを入力してください</p>
        )}
      </div>
      <div>
        <label htmlFor="confirmPassword" className="">
          新しいパスワード（確認用）
        </label>
        <Input
          id="confirmPassword"
          className="w-96 h-10 mt-2"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setConfirmPassword(e.target.value)
          }
        />
        {confirmPasswordBlankError && (
          <p className="text-red">※確認用パスワードを入力してください</p>
        )}
      </div>
      <OrangeButton
        label="登録"
        className="mt-10 mb-4 w-48 rounded-none"
        type="submit"
      />
    </form>
  );
};

export default ChangePasswordPage;
