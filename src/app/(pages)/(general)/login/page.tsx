'use client';
import Input from '@/components/ui/Input';
import OrangeButton from '@/components/ui/button/OrangeButton';
import Link from 'next/link';
import users from '@/const/login';
import { FormEvent, useState, forwardRef, useRef } from 'react';
import { useRouter } from 'next/navigation';
import SiteTitle from '@/components/ui/SiteTitle';
import { useForm, SubmitHandler } from 'react-hook-form';

type LoginForm = {
  userId: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();

  // ダミーデータ
  const userData = users;
  const correctUser = users[0];

  // フックフォーム
  const {
    register,
    getValues,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<LoginForm>({
    criteriaMode: 'all',
    reValidateMode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    const userId = correctUser.id;
    const password = correctUser.password;
    if (data.userId === `${userId}` && data.password === password) {
      router.push('/');
    }
    console.log('data', data);
  };

  // 内容確認用(削除要)
  const check = () => {
    console.log('errors', errors);
    console.log('getValues("password")', getValues('password'));
  };
  //

  return (
    <>
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
                    validate: {
                      checkPassword: (value) =>
                        value !== correctUser.password
                          ? '※ユーザーIDが違います。'
                          : undefined,
                    },
                  })}
                />
              </div>
            </label>
            {errors.userId && <p>{errors.userId.message}</p>}
          </div>
          <div>
            <label htmlFor="password" className="">
              パスワード
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
                    validate: {
                      checkPassword: (value) =>
                        value !== correctUser.password
                          ? '※パスワードが違います。'
                          : undefined,
                    },
                  })}
                />
              </div>
            </label>
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <OrangeButton
            label="ログイン"
            className="mt-10 mb-4 w-48 rounded-none"
            type="submit"
            // エラー確認用（削除要）
            onClick={check}
            //
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
