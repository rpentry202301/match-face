"use client";

import { useState } from "react";
import UserIcon from "../nav/UserIcon";
import Logout from "../nav/Logout";

const HumburgerBtn = () => {
  const [opened, setOpened] = useState<boolean>(false);

  // モーダルウィンドウ表示
  if (opened)
    return (
      <>
        <button
          type="button"
          className="z-10 space-y-2"
          onClick={() => setOpened(false)}
        >
          <div className="w-8 h-0.5 bg-gray-600 translate-y-2.5 rotate-45 transition duration-500 ease-out" />
          <div className="opacity-0 transition duration-500 ease-out" />
          <div className="w-8 h-0.5 bg-gray-600 -rotate-45 transition duration-500 ease-out" />
        </button>
        <nav className="text-center fixed bg-light-gray bg-opacity-90 right-0 top-0 w-2/12 flex flex-col justify-start py-6 px-3 ease-out duration-200">
          <ul className="mt-6">
            {/* 追加する場合は"nav/menu/template/MenuTemp.tsx"を参照 */}
            <li className="pb-5">
              <UserIcon />
            </li>
            <li>
              <Logout />
            </li>
          </ul>
        </nav>
      </>
    );

  // モーダルウィンドウ非表示
  return (
    <>
      <button
        type="button"
        className="z-10 space-y-2"
        onClick={() => setOpened(true)}
      >
        <div className="w-8 h-0.5 bg-gray-600 transition duration-500 ease-out" />
        <div className="w-8 h-0.5 bg-gray-600 transition duration-500 ease-out" />
        <div className="w-8 h-0.5 bg-gray-600 transition duration-500 ease-out" />
      </button>
      <nav className="fixed right-[-100%]">
        <ul className="mt-6 w-4/5">
          <li>
            <UserIcon />
          </li>
          <li>
            <Logout />
          </li>
        </ul>
      </nav>
    </>
  );
};

export default HumburgerBtn;
