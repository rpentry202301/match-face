    import { NextResponse } from "next/server";

    export async function POST(req: Request) {
    const url = process.env["BE_URL"];

        try {
        const data = req.body;
        const response = await fetch(`${url}/user_groups/user_group`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            return NextResponse.json({ message: "POSTしました", data },{status:200});
        } else {
            return NextResponse.error();
        }
        } catch (error) {
            console.error('エラー発生:',error)
        return NextResponse.error();
        }
    } 
