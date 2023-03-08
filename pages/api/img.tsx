import { NextApiRequest, NextApiResponse } from "next";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res;
  const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

  console.log(body);
}