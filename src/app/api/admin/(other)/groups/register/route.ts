import { NextApiResponse} from "next"

export default async function POST(req:Request,res:NextApiResponse){
    const response = await fetch('http://localhost:8080/qa_system_api/groups')
    const groups = await response.json()
    res.status(200).json({groups})
}