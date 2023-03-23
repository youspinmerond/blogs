import verify from "services/verify";
import { NextApiRequest, NextApiResponse } from "next";
import { JwtPayload } from "jsonwebtoken";
import IUser from "@/types/user";
import { use } from "next-api-middleware";
import CORSMiddleware from "@/middlewares/cors";
import validMethods from "@/middlewares/validMethods.middleware";

interface IBody {
  token: string;
  tokenCheck: string;
}

const handler = async (
  req: NextApiRequest, res: NextApiResponse
) => {

  const body: IBody = typeof req.body === "string" ?
    JSON.parse(req.body) : req.body;

  if(!body) return res.status(400).json(
    {message:"You didn't sent body"}
  );
  if(!body.token) return res.status(400).json(
    {message: "You didn't specified \"token\"."}
  );

  const user: IUser | boolean | string | JwtPayload = verify(body.token);
  if(!user) return res.status(400).json({message: "No user found."});
  if(typeof user === "string" || typeof user === "boolean")
    return res.status(400).json({message: "No user found."});
  if(!user.role) return res.status(400).json({message: "No user found."});
  if(!user.role.includes("ADMIN")) {

    const result = verify(body.tokenCheck);
    res.status(400);
    return res.status(200).json({ result, password: undefined, iat: undefined});
  }

  if(!body.tokenCheck)
    return res.status(400).json(
      {
        message: [
          "We didn't found token for check.",
          " Send it in \"tokenCheck\" field."
        ].join("")
      }
    );

  return res.status(200).json(verify(body.tokenCheck));
};

export default use(CORSMiddleware, validMethods(["POST"]))(handler);