import Input from '@/components/ui/Input';
import OrangeButton from '@/components/ui/button/OrangeButton';

const LoginPage = () => {
  return (
    <div className="flex flex-col">
      <h1 className=" text-orange font-normal">Match Face</h1>
      <p className="">ユーザーID</p>
      <Input />
      <p className="">パスワード</p>
      <Input />
      <OrangeButton label="ログイン" />
    </div>
  );
};

export default LoginPage;
