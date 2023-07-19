'use client';
import SiteTitle from '@/components/ui/SiteTitle';
import OrangeButton from '@/components/ui/button/OrangeButton';
import users from '@/const/login';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';

// データの型はnumberだが、都合上stringに設定
type LoginForm = {
  userId: string;
  password: string;
};

// ダミーデータ
const userData = users;
const adminCorrectUser = users[2];

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

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    // 仮データで設定
    const userId = adminCorrectUser.id;
    const password = adminCorrectUser.password;
    if (data.userId === `${userId}` && data.password === password) {
      router.push('/admin');
    }
    // console.log('data', data);
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
            <label htmlFor="userId" className="">
              ユーザーID
              <div>
                <input
                  id="userId"
                  type="text"
                  className="w-96 h-10 mt-2 border border-black"
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
                      checkUserId: (value) =>
                        Number(value) !== adminCorrectUser.id
                          ? '※正しいユーザーIDを入力してください。'
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
                        value !== adminCorrectUser.password
                          ? '※正しいパスワードを入力してください。'
                          : undefined,
                    },
                    // pattern: {
                    //   value:
                    //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[._\/#&%=\\~\-+*@()<>\\[\\]{}])[a-zA-Z\d._\/#&%=\\~\-+*@()<>\\[\\]{}]{8,}$/,

                    //   message: '※正しいパスワードを入力してください。',
                    // },
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
