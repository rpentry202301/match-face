import { NextRequest } from "next/server";

export async function POST(){
    const response = await fetch('http://localhost:8080/qa_system_api/groups',{cache:'no-cache'})
    if (!response.ok) {
        throw new Error("エラー");
      }
    const data = await response.json()
    return NextRequest

}