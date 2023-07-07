"use client";
import { dataArray } from "@/const/adminTop";
import Menu from "@/components/ui/Menu";


const AdminMenu = () => {
  return (
    <div className="flex flex-wrap justify-start items-center w-screen h-screen">
      {dataArray.map((data: any, index: number) => (
        <div key={index} className="flex mx-10 my-10">
          <Menu
          className=""
            title={data.title}
            url={data.url}
            description={data.description}
            imgUrl={data.imgUrl}
            imgAlt={data.imgAlt}
          />
        </div>
      ))}
    </div>
  );
};

export default AdminMenu;
