'use client';
import SiteTitle from '@/components/ui/SiteTitle';
import OrangeButton from '@/components/ui/button/OrangeButton';
import users from '@/const/login';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

type NewPasswords = {
  newPassword: string;
  confirmPassword: string;
};

const ChangePasswordPage = () => {
  // ルーター
  const router = useRouter();

  //ダミーデータ
  const userData = users;

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<NewPasswords>({
    criteriaMode: 'all',
    reValidateMode: 'onChange',
  });

  const onSubmit = (data: NewPasswords) => {
    if (isValid) {
      alert('パスワードが変更されました。');
      router.push('/login');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-center h-screen"
    >
      <SiteTitle className="m-8" />
      <div className="flex flex-col items-center bg-light-gray p-4">
        <p className="font-semibold underline">
          英小文字・数字・記号を１文字以上含む８文字以上で設定して下さい。
        </p>
        <p>※半角の英小文字・英大文字・数字・記号が使用できます。</p>
        <br />
        <p>
          使用可能記号&emsp;&#46; &#95; &#47; &#35; &amp; &#37; &#61; &#126;
          &#45; &#43; &#42; &#64; &#40; &#41; &lt; &gt; &#91; &#93; &#123;
          &#125;
        </p>
      </div>
      <br />
      <div className="mb-2">
        <label htmlFor="newPassword" className="">
          新しいパスワード
          <div>
            <input
              id="newPassword"
              // 入力したパスワード確認用にコメントアウト
              // todo: コメントアウト外す
              // type="password"
              className="w-96 h-10 mt-2 border border-black"
              {...register('newPassword', {
                required: {
                  value: true,
                  message: '※パスワードを入力してください。',
                },
                pattern: {
                  // 記号 . _ / # & % = ~ - + * @ ( ) < > [ ] { } が1つ以上含まれるかつ、半角英数字が含まれる、かつ8文字以上
                  value:
                    /^(?=.*[a-z])(?=.*[\d])(?=.*[._\/#&%=~\-+*@()<>\[\]{}])[a-z\d._\/#&%=~\-+*@()<>\[\]{}]{8,}.*$/,
                  message: '※パスワードの条件を満たしていません。',
                },
              })}
            />
          </div>
        </label>
        {errors.newPassword && (
          <p className="text-red">{errors.newPassword.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="confirmPassword" className="">
          新しいパスワード（確認用）
          <div>
            <input
              id="confirmPassword"
              // 入力したパスワード確認用にコメントアウト
              // todo: コメントアウト外す
              // type="password"
              className="w-96 h-10 mt-2 border border-black"
              {...register('confirmPassword', {
                required: {
                  value: true,
                  message: '※確認用パスワードを入力してください。',
                },
                validate: (confirmPassword) =>
                  confirmPassword !== getValues('newPassword')
                    ? '※パスワードと確認用パスワードが一致しません。'
                    : undefined,
              })}
            />
          </div>
        </label>
        {errors.confirmPassword && (
          <p className="text-red">{errors.confirmPassword.message}</p>
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
