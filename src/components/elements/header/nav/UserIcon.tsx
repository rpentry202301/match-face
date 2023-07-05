import Image from "next/image";

// UserIcon.tsxは特有の非同期通信が必要なため個別で定義
// ToDo: ①ユーザーアイコン ②ユーザー名 のfetch
const UserIcon = async() => {
  return (
    <div className="flex justify-evenly items-center block border-b-2 border-gray-400 border-opacity-0 p-0.5 w-4/5 m-auto">
      <div className="relative w-8 h-8 flex justify-center">
        <Image fill src={"/icon/human_icon.png"} alt="user" sizes="(max-width: 600px) 10vw, (max-width: 1200px) 30vw, 60px" />
      </div>
      <p className="text-sm">ユーザー名</p>
    </div>
  );
};

export default UserIcon;
