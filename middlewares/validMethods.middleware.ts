import { NextApiRequest, NextApiResponse } from "next";
import { Middleware } from "next-api-middleware";

type method = "GET" | "POST" | "PUT" | "DELETE";

const validMethods = (methods: method | method[]) => {
  const validMethodsMiddleware: Middleware = async (req: NextApiRequest, res: NextApiResponse, next) => { 
    const isMethodValid = Array.isArray(methods)
      ? methods.includes(req.method as method)
      : req.method === methods;
      
    if(!isMethodValid)
      return res.status(405)
        .json(
          {
            message:"Wrong method.",
            allowed: Array.isArray(methods) ? methods.join(" ") : methods
          }
        );
  
    await next();
  };
  return validMethodsMiddleware;
};

export default validMethods;