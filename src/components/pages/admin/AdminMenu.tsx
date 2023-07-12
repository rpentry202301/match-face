"use client";
import { dataArray } from "@/const/adminTop";
import Menu from "@/components/ui/Menu";

const AdminMenu = () => {
  return (
    <div className="flex justify-center items-center min-h-screen md:mt-[-40px]">
        <div className="grid grid-cols-1 md:grid-cols-3 md:mt-10">
          {dataArray.map((data: any, index: number) => (
            <div key={index} className="m-10">
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
