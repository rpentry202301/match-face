import { NextResponse,NextRequest } from "next/server"

export async function GET(req: NextRequest){
    const url = new URL(req.url)
    const search = url.searchParams.get("search")
    const apiURL = search ? `${process.env['BE_URL']}/projects?${search}` : `${process.env['BE_URL']}/projects`
    const response = await fetch(`${apiURL}`)
    if(!response.ok) throw new Error('Failed to fetch data')
    const data = await response.json()
    return NextResponse.json(data.projectList)
}
