"use client";

import React, { useState,useEffect } from "react";
import { getGroup } from "./getGroups";




const GroupTableFromDb = () => {

  const [groupData, setGroupData] = useState([])
  useEffect(()=>{
    const getData = async()=>{
        try{
            const fetchedData = await getGroup()
            setGroupData(fetchedData)
            console.log(fetchedData)
        }catch(error){
            console.error(error)
        }
    }
    getData()
  },[])


  return (
    <>
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
            {groupData.map((obj:any) => (
              <tr key={obj.id}>
                <td
                  className="border px-4 py-2 "
                  style={{ textAlign: "center" }}
                >
                  {obj.createdAt}
                </td>
                <td
                  className="border px-4 py-2"
                  style={{ textAlign: "center" }}
                >
                  {obj.name}
                </td>
                <td
                  className="border px-4 py-2"
                  style={{ textAlign: "center" }}
                >
                  {obj.memberCount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
      </div>
    </>
  );
};

export default GroupTableFromDb;
