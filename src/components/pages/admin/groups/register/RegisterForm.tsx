"use client";

import React, { useState } from "react";
import OrangeButton from "@/components/ui/button/OrangeButton";
import Link from "next/link";
import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/TextArea";
import UserSelectModal from "../../tasks/register/UserSelectModal";
import UserInput from "./UserInput";
import { useRouter } from "next/navigation";


const RegisterForm = ({children}:any) => {
  // モーダル表示用
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // 初期値
  const [groupName, setGroupName] = useState("");
  const [groupMember, setGroupMember] = useState([]);
  const [groupDescription, setGroupDescription] = useState("");
  const [errorGroupName, setErrorGroupName] = useState("");

  //モーダル
  const toggleModal = () => {
    if (groupName === "") {
      setErrorGroupName("グループ名が空欄です");
    } else {
      setIsOpen(!isOpen);
      setErrorGroupName("");
    }
  };

  // 非同期通信(post)
  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = {
        groupName,
        groupDescription,
        userIds:[1],
        administratorId:0
      };
        const response = await fetch(
          "http://localhost:3000/api/admin/groups/register",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          }
        );
      if (response.status === 200) {
        console.log("データを登録しました", body);
        router.push('/admin/groups')
        setIsOpen(!isOpen);
      }else{
        console.error("データ登録に失敗しました:",response.status)
      }
    } catch(error) {
      console.error('エラー発生',error)
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="border-2  py-12 px-12 ">
          <form onSubmit={submitData}>
            <label htmlFor="group_name">▶グループ名を設定する</label>
            <Input
              id="group_name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              style={{ width: "600px" }}
              className="my-3 px-2 py-1 border-2 border-gray-300"
              data-testid="groupName"
            />
            <p className="text-red" data-testid="errorGroupName">
              {errorGroupName}
            </p>
            {/* <br /> */}
             {/* <label htmlFor="user">▶ユーザーを選択する</label> */}
            {/*コンポートの外に配置することで対処両方*/}
            {/* <UserSelectModal /> */}
            {children}
            {/* <UserInput /> */}
            <label htmlFor="group_description">▶備考</label>
            <TextArea
              id="group_description"
              cols={1}
              rows={1}
              value={groupDescription}
              onChange={(e) => setGroupDescription(e.target.value)}
              className="my-3 px-2 py-1 border-2 border-gray-300"
            />
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
          <div className="block w-full h-full bg-black/30 absolute top-0 left-0">
            <div className="flex flex-col items-center justify-center h-screen">
              <div className="bg-white px-2 py-2">
                <h2
                  className="font-black px-1 py-3"
                  data-testid="confirmRemark"
                >
                  グループを設定してよろしいですか?
                </h2>
                <div className="flex flex-col  items-center justify-center mx-5 my-1">
                  <Link href={"/admin/groups"}>
                    <button
                      onClick={submitData}
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
