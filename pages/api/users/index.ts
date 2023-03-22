import validMethods from "@/middlewares/validMethods.middleware";
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import { use } from "next-api-middleware";
import users from "services/users/index";
import IUser from "@/types/user";
import CORSMiddleware from "@/middlewares/cors";

interface IBody {
  id: number;
}
const handler: NextApiHandler = async (
  req: NextApiRequest, res: NextApiResponse
) => {
  CORSMiddleware(req, res);
  if(req.method === "GET") {
    const body: IBody = req.body;
    if(!body.id) return res.status(400).json(
      {
        message:"Send \"id\" fields with member's id. Dont forget about token."
      }
    );
    if(typeof body.id !== "number") return res.status(400).json(
      {
        message:"Wrong datatype. Send please number ID."
      }
    );

    const User = await users.find(body.id);
    if(User === null || User === undefined) return res.status(400).json(
      {message:"We're couldn't to find your friend."}
    );
    res.status(200).json(User);
  }
  if(req.method === "POST") {
    
    const body: IUser & {password1: string, password2: string} =
    typeof req.body === "string" ? JSON.parse(req.body).body :
      typeof req.body.body === "string" ? JSON.parse(req.body.body) :
        req.body.body;
        
    if(body === undefined || typeof body === "string")
      return res.status(400).json(
        {message:"Wrong body fields."}
      );
    if(!body.name)
      return res.status(400).json(
        {message:"You didn't specified \"name\" field."}
      );
    if(!body.email)
      return res.status(400).json(
        {message:"You didn't specified \"email\" field."}
      );
    if(body.password1 === undefined || !body.password2)
      return res.status(400).json(
        {message:"You didn't specified \"password1\" and \"password2\" field."}
      );
    
    const result = await users.create(
      {
        ...body,
        password: body.password1,
        password1: undefined,
        password2: undefined
      }
    );
    if(result === "mistake" || result === undefined || result === null)
      return res.status(500).json({message:"Might it busy?"});
    res.setHeader("Set-Cookie","token="+result.token+"; Path=/");
    return res.status(201).json(result?.result);
  }
};

export default use(validMethods(["GET", "POST", "DELETE"]))(handler);