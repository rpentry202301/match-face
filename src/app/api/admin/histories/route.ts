import { NextResponse } from "next/server"
export async function GET(){
    const response = await fetch(`${process.env['BE_URL']}/answer_requests`)
    if(!response.ok) throw new Error('Failed to fetch data')
    const data = await response.json()
    return NextResponse.json(data.answerRequests);
}
