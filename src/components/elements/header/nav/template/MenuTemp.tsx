import Image from "next/image";
import Link from "next/link";

// Headerのnavメニューで個別に定義する必要がないコンポーネント用テンプレート
const MenuTemp = ({ text, href, src, alt }: MenuProps) => {
  return (
    <Link
      href={href}
      className="group block border-b-2 border-gray-400 border-opacity-0 p-0.5 w-4/5 m-auto hover:border-opacity-50 duration-200 ease-out"
    >
      <div className="flex justify-evenly items-center group-hover:opacity-50 duration-200 ease-out">
        <div className="relative w-8 h-8 flex justify-center">
          <Image src={src} alt={alt} fill sizes="(max-width: 600px) 10vw, (max-width: 1200px) 30vw, 60px"/>
        </div>
        <p className="text-sm">{text}</p>
      </div>
    </Link>
  );
};

type MenuProps = {
  text: string;
  href: string;
  src: string;
  alt: string;
};

export default MenuTemp;
