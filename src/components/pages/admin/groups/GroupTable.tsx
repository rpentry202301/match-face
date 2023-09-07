"use client";

import React, { useState } from "react";
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
  const [selectedGroupMember, setSelectedGroupMember] = useState("");

  const toggleModal = (group: any) => {
    setSelectedGroupingDate(group.grouping_date);
    setSelectedGroupName(group.group_name);
    setSelectedGroupDescription(group.grouping_description);
    if (group.group_member) {
      setSelectedGroupMember(
        group.group_member.map((member: any) => member.user_name).join(",")
      );
    } else {
      setSelectedGroupMember("");
    }
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* モーダル内テーブル */}
      {isOpen && (
        <div>
          <div
            className="block w-full h-full bg-black/30 absolute top-0 left-0"
            onClick={() => toggleModal(group)}
          >
            <div className="flex flex-col items-center justify-center h-screen">
              <div className="bg-orange  h-9 w-3/5">
                <h1>&nbsp;</h1>
              </div>
              <div className="bg-white px-7 pt-7 w-3/5 h-4/5">
                <div style={{ paddingTop: "7%" }}>
                  <table
                    className="border-collapse items-center justify-center w-full table-fixed"
                    data-testid="modalTable"
                  >
                    <tbody>
                      <tr>
                        <th className="border px-4 py-2 bg-light-gray w-1/4">
                          作成日
                        </th>
                        <td className="border px-4 py-2 w-3/4">
                          {selectedGroupingDate}
                        </td>
                      </tr>
                      <tr>
                        <th className="border px-4 py-2 bg-light-gray w-1/4">
                          グループ名
                        </th>
                        <td className="border px-4 py-2 w-3/4">
                          {selectedGroupName}
                        </td>
                      </tr>
                      <tr>
                        <th className="border px-4 py-2 bg-light-gray w-1/4">
                          メンバー
                        </th>
                        <td className="border px-4 py-2 w-3/4 break-words whitespace-pre-wrap">
                          {selectedGroupMember}
                        </td>
                      </tr>
                      <tr>
                        <th className="border px-4 py-2 bg-gray-100 break-words w-1/4 ">
                          備考
                        </th>
                        <td className="border px-4 py-2 w-3/4 break-words whitespace-pre-wrap">
                          {selectedGroupDescription}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 通常表示テーブル */}
      <div className="flex flex-col items-center justify-center h-screen table-fixed">
        <table>
          <thead>
            <tr>
              <th className="border px-4 py-2 bg-light-gray w-1/5">作成日</th>
              <th className="border px-4 py-2 bg-light-gray w-1/4">
                グループ名
              </th>
              <th
                className="border px-4 py-2 bg-light-gray"
                style={{ width: "7%" }}
              >
                人数
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((group) => (
              <tr key={group.id}>
                <td
                  className="border px-4 py-2 "
                  style={{ textAlign: "center" }}
                >
                  {group.grouping_date}
                </td>
                <td
                  className="border px-4 py-2"
                  style={{ textAlign: "center" }}
                >
                  <button
                    onClick={() => toggleModal(group)}
                    className="hover:bg-amber-200 duration-200"
                    data-testid={`group_${group.id}`}
                  >
                    {group.group_name}
                  </button>
                </td>
                <td
                  className="border px-4 py-2"
                  style={{ textAlign: "center" }}
                >
                  {group.group_member.length}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        {!isOpen && (
          <Link href={"/admin/groups/register"} data-testid="register">
            <OrangeButton label="新規グループ作成" />
          </Link>
        )}
      </div>
    </>
  );
};

export default GroupTable;
