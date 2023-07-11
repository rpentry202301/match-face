"use client";
import { dataArray } from "@/const/adminTop";
import Menu from "@/components/ui/Menu";

const AdminMenu = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className=" flex flex-wrap justify-center items-center w-full">
        {dataArray.map((data: any, index: number) => (
          <div key={index} className=" mx-10 my-10">
            <Menu
              title={data.title}
              url={data.url}
              description={data.description}
              imgUrl={data.imgUrl}
              imgAlt={data.imgAlt}
            />
          </div>
        ))}
        {/* 均等に配置するために空のdiv要素を追加↓ */}
        <div className=" w-[384px] h-[160px] mx-10 my-10"></div>
      </div>
    </div>
  );
};

export default AdminMenu;
