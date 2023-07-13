"use client";

import { useState } from "react";
import OrangeButton from "@/components/ui/button/OrangeButton";
import Link from "next/link";
import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/TextArea";
import UserSelectModal from "../../tasks/register/UserSelectModal";

// グループ一覧に遷移する機能作ったほうが良い？

const RegisterForm = () => {
  // モーダル表示用
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="border-2  py-5 px-5 ">
          <form>
            <label htmlFor="group_name">▶グループ名を設定する</label>
            <Input id="group_name" style={{ width: "600px" }} className="my-3"/>
            <br />
            <label htmlFor="user">▶ユーザーを選択する</label>
            <span>&nbsp;</span>
            <UserSelectModal />
            <Input id="user" style={{ width: "600px" }} className="my-3"/>
            <br />
            <label htmlFor="group_description">▶備考</label>
            <Input id="group_description" style={{ width: "600px" }} className="my-3"/>
            {/* テキストエリアにするかも*/}
            {/* <TextArea id="group_description" cols={1} rows={1} value={''}/> */}
          </form>
          <br />
          <div className="flex flex-col items-center justify-center">
          <OrangeButton
            label="グループを設定する"
            className="py-19 text-xs"
            onClick={toggleModal}
            data-testid="registerConfirm"
          />
          </div>
        </div>
      </div>

      {isOpen && (
        <div>
          <div className="block w-full h-full bg-black/70 absolute top-0 left-0">
            <div className="flex flex-col items-center justify-center h-screen">
              <div className="bg-white px-2 py-2">
                <h2 className="font-black px-1 py-3">
                  グループを設定してよろしいですか?
                </h2>
                <div className="flex flex-col  items-center justify-center mx-5 my-1">
                  <Link href={"/admin/groups"}>
                    {/* 今は遷移にしてますがのちのちポストします */}
                    <button
                      onClick={toggleModal}
                      className="hover:bg-gray-400 duration-200"
                      data-testid="registerTrue"
                    >
                      設定する
                    </button>
                  </Link>
                  <button
                    onClick={toggleModal}
                    className="hover:bg-gray-400 duration-200"
                  >
                    キャンセル
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterForm;
