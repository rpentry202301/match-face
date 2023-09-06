import { NextApiRequest, NextApiResponse } from "next";

export async function Get (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const response = await fetch(`http://localhost:8080/qa_system_api/groups`,{
        cache:"no-cache"
    })
      const data = await response.json()
      res.status(200).json({data});
    } catch (error) {
      res.status(500).json({ messeage: "internal server error" });
    }
  } else {
    res.status(405).json({ message: "method not allowed!!!  " });
  }
};
