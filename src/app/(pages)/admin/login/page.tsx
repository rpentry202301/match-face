'use client';
import SiteTitle from '@/components/ui/SiteTitle';
import OrangeButton from '@/components/ui/button/OrangeButton';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';

// データの型はnumberだが、都合上stringに設定
type LoginForm = {
  administratorId: string;
  password: string;
};

const AdminLoginPage = () => {
  const router = useRouter();
  const [inValidAdministrator, setInValidAdministrator] = useState(false);

  // フックフォーム
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginForm>({
    criteriaMode: 'all',
    reValidateMode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    // データ取得
    try {
      const response = await fetch('/api/admin/login', {
        cache: 'no-store',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          administratorId: data.administratorId,
          password: data.password,
        }),
      });
      // ユーザーIDとパスワードが一致するデータがあればオブジェクト、なければ{administrator:"[]"}が返ってくる
      const administratorData = await response.json();
      const administrator = administratorData.administrator;
      if (administrator.length === 0) {
        setInValidAdministrator(true);
      }
      if (isValid && administrator.id && administrator.password) {
        setInValidAdministrator(false);
        router.push('/admin');
      }
    } catch (error) {
      throw new Error('api error');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="flex flex-col items-center m-3">
            <SiteTitle className="m-3" />
            <h2>管理者用ログイン</h2>
          </div>

          <div className="mt-2 mb-2">
            <label htmlFor="administrarorId" className="">
              ユーザーID
              <div>
                <input
                  id="administratorId"
                  type="text"
                  className="w-96 h-10 mt-2 border border-black"
                  {...register('administratorId', {
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
            {errors.administratorId && (
              <p className="text-red">{errors.administratorId.message}</p>
            )}
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
                  })}
                />
              </div>
            </label>
            {errors.password && (
              <p className="text-red ">{errors.password.message}</p>
            )}
            {inValidAdministrator &&
              !errors.administratorId &&
              !errors.password && (
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
          {/* <Link href="/remind" className=" text-blue"> */}
          <p className="text-blue">パスワードを忘れた</p>
          {/* </Link> */}
          <Link href="/login" className="text-blue pt-16">
            一般ログイン
          </Link>
        </div>
      </form>
    </>
  );
};

export default AdminLoginPage;
