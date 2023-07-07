"use client";

import { useState } from "react";
import { group } from "@/const/group";
import OrangeButton from "@/components/ui/button/OrangeButton";
import Link from "next/link";

const data = group;

const GroupTable = () => {
  // モーダル表示用
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGroupingDate, setSelectedGroupingDate] = useState("");
  const [selectedGroupName, setSelectedGroupName] = useState("");
  const [selectedGroupDescription, setSelectedGroupDescription] = useState("");

  const toggleModal = (group: any) => {
    setSelectedGroupingDate(group.grouping_date);
    setSelectedGroupName(group.group_name);
    setSelectedGroupDescription(group.grouping_description);
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen && (
        <div id="modal" className="hidden target:block">
          <div className="block w-full h-full bg-black/70 absolute top-0 left-0">
            <div className="flex flex-col items-center justify-center h-screen">
              <div className="bg-white px-2 py-2">
                <h1>グループ詳細</h1>
                <table>
                  <thead>
                    <tr>
                      <th className="border px-4 py-2">日付</th>
                      <th className="border px-4 py-2">グループ名</th>
                      <th className="border px-4 py-2">メンバー</th>
                      <th className="border px-4 py-2">備考</th>
                    </tr>
                  </thead>
                  <tbody>
                    <td className="border px-4 py-2">{selectedGroupingDate}</td>
                    <td className="border px-4 py-2">{selectedGroupName}</td>
                    <td className="border px-4 py-2"></td>
                    <td className="border px-4 py-2">{selectedGroupDescription}</td>
                  </tbody>
                </table>
                <div className="flex flex-col  items-center justify-center mx-5 my-1">
                <button onClick={() => toggleModal(group)} className="">閉じる</button>
              </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col items-center justify-center h-screen">
        <table>
          <thead>
            <tr>
              <th className="border px-4 py-2">グループ作成日</th>
              <th className="border px-4 py-2">グループ名</th>
              <th className="border px-4 py-2">人数</th>
            </tr>
          </thead>
          <tbody>
            {data.map((group) => (
              <tr key={group.id}>
                <td className="border px-4 py-2">{group.grouping_date}</td>
                <td className="border px-4 py-2">
                  <a href="#modal">
                    <button onClick={() => toggleModal(group)}>
                      {group.group_name}
                    </button>
                  </a>
                </td>
                <td className="border px-4 py-2">
                  {group.group_member.length}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <Link href={"/admin/groups/register"}>
          <OrangeButton label="新規グループ作成" />
        </Link>
      </div>
    </>
  );
};

export default GroupTable;
