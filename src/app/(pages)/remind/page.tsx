'use client';
import Input from '@/components/ui/Input';
import SiteTitle from '@/components/ui/SiteTitle';
import OrangeButton from '@/components/ui/button/OrangeButton';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

type RemindEmail = {
  email: string;
};

const RemindPage = () => {
  // const [email, setEmail] = useState<string>();
  // const [emailBlankError, setEmailBlankError] = useState<boolean>(false);

  // // （仮）リマインドメール送信
  // const sentRemindEmail = (event: any) => {
  //   event.preventDefault();
  //   if (!email) {
  //     setEmailBlankError(true);
  //   } else if (email) {
  //     setEmailBlankError(false);
  //     alert('リマインドメールが送信されました');
  //   }
  // };

  const { register } = useForm<RemindEmail>();
  return (
    <>
      <form>
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
                  type="email"
                  className=" w-96 h-10 mt-2 border border-black"
                />
              </div>
            </label>
          </div>
          <OrangeButton
            label="再設定用メール送信"
            className=" mt-14 mb-4 w-56 rounded-none"
            type="submit"
          />
          <Link href="/login" className="text-blue">
            一般ログインへ
          </Link>
        </div>
      </form>
    </>
  );
};

export default RemindPage;
