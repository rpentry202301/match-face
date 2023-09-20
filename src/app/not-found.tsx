import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <h1 className=" text-4xl font-bold">
        お探しのページが見つかりませんでした。
      </h1>
      <br />
      <Link href="/login" className=" text-2xl text-blue">
        ログイン画面に戻る
      </Link>
    </div>
  );
}
