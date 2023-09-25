'use client';
import { useState, useEffect } from 'react';
import Menu from '@/components/pages/general/top/Menu';
import { MenuList } from '@/types/types';

const AdminMenu = () => {
  const [menuList, setMenuList] = useState<any[]>([]);
  useEffect(() => {
    const fetchAdminMenu = async () => {
      const response = await fetch('/api/admin');
      const data = await response.json();
      setMenuList(data.administratorMainElementList);
      return menuList;
    };
    fetchAdminMenu();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen md:mt-[-40px]">
      <div className="grid grid-cols-1 md:grid-cols-3 md:mt-10">
        {menuList ? (
          menuList.map((data: MenuList) => (
            <div key={data.id} className="m-10">
              <Menu
                title={data.title}
                url={data.url}
                description={data.description}
                imgUrl={data.imgUrl}
                imgAlt={data.imgAlt}
                data-testid={`menu_link_${data.id}`}
              />
            </div>
          ))
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </div>
  );
};

export default AdminMenu;
