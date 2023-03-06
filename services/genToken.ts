require("dotenv").config();
import jwt from "jsonwebtoken";

interface IUser {
  id: number;
  avatar?: string;
  email: string;
  name: string;
  role: string[];
  rank: number;
  isVerefied: boolean;
  createdAt: Date;
  password: string;
  status: "AVIABLE" | "BANNED";
}

function checkUser(user: IUser) {
  if(!user) return false;
  const condition: Boolean = "id" in user
  && "email" in user
  && "name" in user
  && "role" in user
  && "rank" in user
  && "isVerefied" in user
  && "createdAt" in user
  && "password" in user
  && "status" in user;
  return condition;
}

export default function genToken(user: IUser) {
  if(checkUser(user)) return jwt.sign(user, process.env.JWT_TOKEN as string);
}