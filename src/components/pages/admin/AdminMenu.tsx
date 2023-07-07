"use client";
import { dataArray } from "@/const/adminTop";
import Menu from "@/components/ui/Menu";

const AdminMenu = () => {
  return (
    <div className="flex justify-center items-center">
      <div className=" flex flex-wrap justify-start w-full">
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
      </div>
    </div>
  );
};

export default AdminMenu;
