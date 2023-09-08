'use client';
import SiteTitle from '@/components/ui/SiteTitle';
import OrangeButton from '@/components/ui/button/OrangeButton';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';

// データの型はnumberだが、都合上stringに設定
type LoginForm = {
  administratorId: string;
  password: string;
};

const AdminLoginPage = () => {
  // ルーター
  const router = useRouter();

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
    try {
      // データ取得
      const response = await fetch('/api/admin/login', {
        cache: 'no-store',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          administratorId: data.administratorId,
          password: data.password,
        }),
      });
      const administratorData = await response.json();
      if (isValid && administratorData.administrator) {
        router.push('/admin');
      }
    } catch (error) {
      console.error('api error');
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
          </div>

          <OrangeButton
            label="ログイン"
            className="mt-10 mb-4 w-48 rounded-none"
            type="submit"
            // エラー確認用（削除要）
            // onClick={check}
            //
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
