'use client';
import OrangeButton from '@/components/ui/button/OrangeButton';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SiteTitle from '@/components/ui/SiteTitle';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';

// データの型はnumberだが、都合上stringに設定
type LoginForm = {
  userId: string;
  password: string;
};
const LoginPage = () => {
  const router = useRouter();
  const [inValidUser, setInValidUser] = useState(false);

  // フックフォーム
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginForm>({
    // 複数のエラーを保存する設定
    criteriaMode: 'all',
    // 2回目以降のバリデーションをかけるタイミングの設定。デフォルトは'onChange'。
    reValidateMode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<LoginForm> = async (data, event: any) => {
    event.preventDefault();
    const response = await fetch('http://localhost:3000/api/login', {
      cache: 'no-store',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: data.userId,
        password: data.password,
      }),
    });
    // ユーザーIDとパスワードが一致するデータがあればオブジェクト、なければ{user:"[]"}が返ってくる
    const userData = await response.json();

    // エラー判定
    if (userData.user.length === 0) {
      setInValidUser(true);
    }
    // ユーザーIDとパスワードが返ってきたらログイン成功
    if (isValid && userData.user.id && userData.user.password) {
      setInValidUser(false);
      router.push('/');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center justify-center h-screen">
        <SiteTitle className="m-6" />
        <div className="mt-2 mb-2">
          <label htmlFor="userId" className="">
            ユーザーID
            <div>
              <input
                id="userId"
                type="text"
                className=" w-96 h-10 mt-2 border border-black"
                {...register('userId', {
                  required: {
                    value: true,
                    message: '※ユーザーIDを入力してください。',
                  },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: '※半角数字で入力してください。',
                  },
                })}
              />
            </div>
          </label>
          {errors.userId && <p className="text-red">{errors.userId.message}</p>}
        </div>
        <div>
          <label htmlFor="password" className="">
            パスワード
          </label>
          <div>
            <input
              id="password"
              type="password"
              className="w-96 h-10 mt-2 border border-black"
              {...register('password', {
                required: {
                  value: true,
                  message: '※パスワードを入力してください。',
                },
              })}
            />
          </div>
          {errors.password && (
            <p className="text-red">{errors.password.message}</p>
          )}
          {inValidUser && (
            <p className="text-red">
              ユーザーIDもしくはパスワードに誤りがあります。
            </p>
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
  );
};

export default LoginPage;
