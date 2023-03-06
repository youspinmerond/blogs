require("dotenv").config();
import jwt from "jsonwebtoken";

export default function verify(token: string) {
  let res;
  try {
    res = jwt.verify(token, process.env.JWT_TOKEN as string );
  } catch {
    res =  false;
  }
  return res;
}