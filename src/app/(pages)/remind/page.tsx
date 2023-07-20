'use client';
import SiteTitle from '@/components/ui/SiteTitle';
import OrangeButton from '@/components/ui/button/OrangeButton';
import users from '@/const/login';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

type RemindEmail = {
  email: string;
};

// ダミーデータ
const userData = users;
const correctUser = users[0];

const RemindPage = () => {
  // ルーター
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RemindEmail>({
    criteriaMode: 'all',
    reValidateMode: 'onChange',
  });

  const onSubmit = (data: RemindEmail) => {
    const registerdEmail = correctUser.email;
    if (isValid && data.email === registerdEmail) {
      alert('リマインドメールが送信されました。');
      router.push('/login');
    }
  };

  // 確認用（削除要）
  // const check = () => {
  //   console.log('errors', errors);
  // };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center justify-center h-screen">
        <SiteTitle className="m-8" />
        <span className="mb-7">
          パスワード再設定用のURLを登録メールアドレスに送信します。
        </span>

        <div className="">
          <label htmlFor="email">
            メールアドレス
            <div>
              <input
                id="email"
                type="text"
                className=" w-96 h-10 mt-2 border border-black"
                {...register('email', {
                  required: {
                    value: true,
                    message: '※メールアドレスを入力してください。',
                  },
                  validate: {
                    checkEmail: (email) =>
                      email !== correctUser.email
                        ? '※入力されたメールアドレスが正しくありません。'
                        : undefined,
                  },
                })}
              />
            </div>
          </label>
          {errors.email && <p className="text-red">{errors.email.message}</p>}
        </div>
        <OrangeButton
          label="再設定用メール送信"
          className=" mt-14 mb-4 w-56 rounded-none"
          type="submit"
          // 確認用（削除要）
          // onClick={check}
        />
        <Link href="/login" className="text-blue">
          一般ログインへ
        </Link>
      </div>
    </form>
  );
};

export default RemindPage;
