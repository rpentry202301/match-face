import Input from '@/components/ui/Input';

const RemindPage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className=" text-orange text-2xl font-bold m-6">Match Face</h1>
        <p>パスワード再設定用のURLを指定のメールアドレスに送信します。</p>
        <div className="flex flex-col">
          <label htmlFor="email">メールアドレス</label>
          <Input id="email" />
        </div>
      </div>
    </>
  );
};

export default RemindPage;
