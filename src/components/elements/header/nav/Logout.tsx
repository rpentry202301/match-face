import Image from "next/image";
import Link from "next/link";

// Logout.tsxは特有のクリックイベントが必要なため個別で定義
// ToDo: ログアウトクリックイベントの実装
const Logout = () => {
  return (
    <Link
      href={"/login"}
      className="group block border-b-2 border-gray-400 border-opacity-0 p-0.5 w-4/5 m-auto hover:border-opacity-50 duration-200 ease-out"
    >
      <div className="flex items-center group-hover:opacity-50 duration-200 ease-out">
        <div className="rounded-full h-10 w-10 flex items-center justify-center bg-deep-gray bg-opacity-0 mr-2">
          <div className="relative w-8 h-8 flex justify-center">
            <Image
              src={"/icon/logout.png"}
              alt="logout"
              fill
              sizes="(max-width: 600px) 10vw, (max-width: 1200px) 30vw, 60px"
            />
          </div>
        </div>
        <p className="text-sm">ログアウト</p>
      </div>
    </Link>
  );
};

export default Logout;
