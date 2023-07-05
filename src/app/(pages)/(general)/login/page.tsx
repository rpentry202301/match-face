import Input from '@/components/ui/Input';

const LoginPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className=" text-orange font-normal items-center">Match Face</h1>
      <p className="text-left">ユーザーID</p>
      <Input />
      <p>パスワード</p>
      <Input />
    </div>
  );
};

export default LoginPage;
