import validMethods from "@/middlewares/validMethods.middleware";
import users from "@/services/users";
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import { use } from "next-api-middleware";
import CORSMiddleware from "../../../middlewares/cors";

interface IUser {
  email?: string;
  name?: string;
  password: string;
}

const handler: NextApiHandler = async (
  req: NextApiRequest, res: NextApiResponse
) => {
  CORSMiddleware(req, res);
  
  const body:IUser = typeof req.body === "string" ?
    JSON.parse(req.body) : req.body;
  if(!body) return res.status(400).json({message:"Wrong body fields."});
  if(!body.password)
    return res.status(400).json(
      {message:"You didn't specified \"password\" field."}
    );
  
  const result = await users.login(
    {email: body.email, name: body.name, password: body.password}
  );
  if(!result)
    return res.status(500).json(
      {message:"Something wrong. Or your data wrong?"}
    );
  res.setHeader("Set-Cookie","token="+result.token+"; Path=/");
  return res.status(200).json(result);
  
};

export default use(validMethods("POST"))(handler);